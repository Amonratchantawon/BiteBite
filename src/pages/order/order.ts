import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { CartModel } from '../../assets/model/cart.model';
import { UserModel } from '../../assets/model/user.model';
import { Constants } from '../../app/app.constants';

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
  user: UserModel = new UserModel();
  isPromotionCode: Boolean = false;
  address: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartProvider: CartProvider
  ) {
  }

  ionViewWillEnter() {
    this.order = this.cartProvider.getCartByShop();
    this.user = this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
    this.address = JSON.parse(window.localStorage.getItem('select_address'));
  }

  confirmOrder() {
    this.navCtrl.push('ConfirmedPage');
  }

  applyCode() {
    this.isPromotionCode = true;
  }

  openMap() {
    this.navCtrl.push('GoogleMapsPage');
  }

}
