import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { CartModel } from '../../assets/model/cart.model';
import { UserModel } from '../../assets/model/user.model';
import { CartProvider } from '../../providers/cart/cart';
import { Constants } from '../../app/app.constants';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from 'ionic-angular';
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
    private cartProvider: CartProvider,
    public app: App,
    private translate: TranslateService,
    private alertCtrl: AlertController
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

  cancelOrder() {
    let language = this.translate.currentLang;
    let title = '';
    let description = '';
    let cancel = '';
    let ok = '';

    if (language === 'th') {
      title = "ยกเลิกรายการ"
      description = "คุณแน่ใจที่จะยกเลิกรายการหรือไม่"
      cancel = 'ยกเลิก'
      ok = 'ตกลง'
    } else if (language === 'en') {
      title = "Cancel order"
      description = "Do you want to cancel order?"
      cancel = 'Cancal'
      ok = 'Ok'
    }

    let alert = this.alertCtrl.create({
      mode: 'ios',
      title: title,
      message: description,
      buttons: [
        {
          text: cancel,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: ok,
          handler: () => {
            this.navCtrl.popTo('Order');
          }
        }
      ]
    });
    alert.present();
  }
}
