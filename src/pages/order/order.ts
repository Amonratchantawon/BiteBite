import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { CartModel } from '../../assets/model/cart.model';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  order: CartModel = new CartModel();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartProvider: CartProvider
  ) {
  }

  ionViewWillEnter() {
    this.order = this.cartProvider.getCartByShop();
  }

}
