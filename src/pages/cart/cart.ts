import { CartModel } from '../../assets/model/cart.model';
import { CartProvider } from '../../providers/cart/cart';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartData: CartModel = new CartModel();

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartProvider: CartProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.getCart();
  }

  getCart() {
    this.cartProvider.getCart().then((res) => {
      this.cartData = res;
      console.log(res);
      this.countPrice();
    })
  }

  onBack(){
    this.navCtrl.pop();
  }

  checkOut() {
    console.log('object');
  }

  countDelete(item) {
    if (item.qty > 1) {
      item.qty--;
      item.amount = item.product.price * item.qty;
    }
    this.countPrice();
  }

  countPlus(item) {
    item.qty++;
    item.amount = item.product.price * item.qty;
    this.countPrice();
  }

  countPrice() {
    this.cartData.qty = 0;
    this.cartData.amount = 0;
    this.cartData.items.forEach((e) => {
      this.cartData.qty += e.qty;
      this.cartData.amount += e.amount;
    });
  }

}
