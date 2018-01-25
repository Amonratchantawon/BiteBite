import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  payment: string = '1';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loading: LoadingProvider,
    public alert: AlertProvider,
    private translate: TranslateService,
    private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  onPayment() {
    let language = this.translate.currentLang;
    let title = '';
    let massage = '';
    let button = '';

    this.loading.onLoading();
    setTimeout(() => {
      this.loading.dismiss();

      if (language == 'th') {
        title = 'รายการสั่งซื้อสำเร็จ';
        massage = 'ขอบคุณที่ใช้บริการ';
        button = 'ตกลง';
      } else if (language == 'en') {
        title = 'Order successfully';
        massage = 'Thank you';
        button = 'OK';
      }
      
      let alert = this.alertCtrl.create({
        mode: 'ios',
        title: title,
        message: massage,
        buttons: [
          {
            text: button,
            handler: () => {
              this.navCtrl.push('NavtabsPage');
            }
          }
        ]
      });
      alert.present();
    }, 3000);

  }

}
