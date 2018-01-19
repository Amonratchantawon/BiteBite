import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../app/app.constants';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {


  constructor(public http: HttpClient) {

  }

  getCartByShop() {
    let shop = JSON.parse(window.localStorage.getItem('select_shop@' + Constants.URL));
    if (shop) {
      return window.localStorage.getItem('cart@' + Constants.URL + 'by#' + shop._id) ? JSON.parse(window.localStorage.getItem('cart@' + Constants.URL + 'by#' + shop._id)) : null;
    } else {
      return null;
    }
  }

  addToCart(item) {
    let shop = JSON.parse(window.localStorage.getItem('select_shop@' + Constants.URL));
    if (shop) {
      let cart = JSON.parse(window.localStorage.getItem('cart@' + Constants.URL + 'by#' + shop._id));

      if (cart && cart.items && cart.items.length > 0) {
        let product = cart.items.filter((obj) => obj.product._id === item.product._id);
        let product_remark = product.filter((obj) => obj.remark === item.remark);

        if (product_remark && product_remark.length > 0) {
          product_remark[0].qty += item.qty;
        } else {
          cart.items.push(item);
        }

      } else {
        cart = {
          items: []
        }
        cart.shop = shop;
        cart.items.push(item);
      }

      cart.qty = 0;
      cart.amount = 0;
      cart.items.forEach((e) => {
        e.amount = e.qty * e.product.price;
        cart.qty += e.qty;
        cart.amount += e.amount;
      });

      window.localStorage.setItem('cart@' + Constants.URL + 'by#' + shop._id, JSON.stringify(cart));
      return cart;
    } else {
      return;
    }
  }

  getBadgeCartByShop() {
    let shop = JSON.parse(window.localStorage.getItem('select_shop@' + Constants.URL));
    let badge = 0;
    if (shop) {
      let cart = JSON.parse(window.localStorage.getItem('cart@' + Constants.URL + 'by#' + shop._id));
      if (cart && cart.items && cart.items.length > 0) {
        badge = cart.qty;
      }
    }
    return badge;
  }

  updateCart(item) {
    let shop = JSON.parse(window.localStorage.getItem('select_shop@' + Constants.URL));
    window.localStorage.setItem('cart@' + Constants.URL + 'by#' + shop._id, JSON.stringify(item));
    return;
  }

}
