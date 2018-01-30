import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import moment from 'moment';

import { UserModel } from '../../assets/model/user.model';
import { Constants } from '../../app/app.constants';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from 'ionic-angular';
import { OrderModel } from '../../assets/model/order.model';
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
  order: OrderModel = new OrderModel();
  user: UserModel = new UserModel();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    private translate: TranslateService,
    private alertCtrl: AlertController
  ) {
    this.order = this.navParams.data;
    this.user = this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
  }

  ionViewDidLoad() {
  }

  getMoment(date) {
    let language = this.translate.currentLang;
    if (language === 'th') {
      moment.locale('th');
    } else if (language === 'en') {
      moment.locale('en');
    }
    return moment(date).format("DD MMMM YYYY HH:mm:ss");
  }

  payment() {
    this.navCtrl.push('PaymentPage', this.order);
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
          text: ok,
          cssClass: 'confirm',
          handler: () => {
            this.navCtrl.popTo('Order');
          }
        },
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

  secondsToTime(d) {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    // let s = Math.floor(d % 3600 % 60);
    let hDisplay;
    let mDisplay;
    let language = this.translate.currentLang;
    if (language === 'th') {
      hDisplay = h > 0 ? h + ' ชม. ' : '';
      mDisplay = m + ' นาที';
    } else if (language === 'en') {
      hDisplay = h > 0 ? h + (h == 1 ? ' hour ' : ' hours ') : '';
      mDisplay = m > 0 ? m + (m == 1 ? ' minute ' : ' minutes ') : '';
    }
    // let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay;
  }
}
