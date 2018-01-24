import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartModel } from '../../assets/model/cart.model';
import { UserModel } from '../../assets/model/user.model';
import { CartProvider } from '../../providers/cart/cart';
import { Constants } from '../../app/app.constants';
// import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the ConfirmedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmed',
  templateUrl: 'confirmed.html',
})
export class ConfirmedPage {
  order: CartModel = new CartModel();
  user: UserModel = new UserModel();
  isSpin: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartProvider : CartProvider
  ) {
    this.order = this.cartProvider.getCartByShop();
    this.user = this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
  }

  ionViewDidLoad() {
    // this.loadingCtrl.onLoading();
    setTimeout(() => {
      // this.loadingCtrl.dismiss();
      this.isSpin = false;
    }, 1000);
    console.log('ionViewDidLoad ConfirmedPage');
  }

  payment() {
    this.navCtrl.push('PaymentPage');
  }
}
