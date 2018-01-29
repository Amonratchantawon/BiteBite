import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { TranslateService } from '@ngx-translate/core';
import { OrderModel } from '../../assets/model/order.model';
import { OrderProvider } from '../../providers/order/order';
import { OmiseProvider } from '../../providers/omise/omise';
import { Constants } from '../../app/app.constants';
import { CartProvider } from '../../providers/cart/cart';

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
  omiseKey: any = Constants.OmiseKey;
  order: OrderModel = new OrderModel();
  paymentDetail: any = {
    paymenttype: '',
    creditno: '',
    creditname: '',
    expdate: '',
    creditcvc: null
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loading: LoadingProvider,
    private alert: AlertProvider,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private orderProvider: OrderProvider,
    private omiseProvider: OmiseProvider,
    private cart: CartProvider
  ) {
  }

  ionViewWillEnter() {
    this.order = this.navParams.data;
  }

  onPayment() {

    this.loading.onLoading();

    this.paymentDetail.paymenttype = this.payment === '1' ? 'Credit Card' : 'Cash on delivery'
    this.order.payment = this.paymentDetail;

    console.log(this.order);

    if (this.payment === '1') {

      this.omiseProvider.getTokenByCredit(this.omiseKey, this.paymentDetail).then((res: any) => {
        console.log(res);
        this.order.omiseToken = res.id;
        this.payOrder();
      }, (err) => {
        this.loading.dismiss();
        console.log(err);
        let language = this.translate.currentLang;
        if (language === 'th') {
          this.alert.onAlert('การชำระเงิน', 'บัตรเครดิตไม่ถูกต้อง', 'ตกลง');
        } else if (language === 'en') {
          this.alert.onAlert('Payment', 'Credit Card Error.', 'OK');
        }
      });

    } else {
      this.payOrder();
    }
  }

  payOrder() {

    let language = this.translate.currentLang;
    let title = '';
    let massage = '';
    let button = '';
    this.orderProvider.payOrder(this.order).then((res) => {

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
              this.cart.clearCart();
              this.navCtrl.push('NavtabsPage');
            }
          }
        ]
      });

      alert.present();

    }, (err) => {
      this.loading.dismiss();
      let language = this.translate.currentLang;
      if (language === 'th') {
        this.alert.onAlert('การสั่งซื้อ', 'สั่งซื้อไม่สำเร็จ กรุณาลองอีกครั้ง', 'ตกลง');
      } else if (language === 'en') {
        this.alert.onAlert('Order', 'Order failed. Please try again.', 'OK');
      }
    });
  }

  isDisabled() {

    if (this.payment === '1') {
      if (this.paymentDetail.creditno && this.paymentDetail.creditname && this.paymentDetail.creditcvc && this.paymentDetail.expdate) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }

  }

  creditFormat() {
    // let pattern = new RegExp('[0-9]{1,30}');
    if (this.paymentDetail.creditno) {
      if (this.paymentDetail.creditno.length > 16) {
        setTimeout(() => {
          this.paymentDetail.creditno = this.paymentDetail.creditno.substr(0, 16);
        }, 0);
      }
    }

    if (this.paymentDetail.creditcvc) {
      if (this.paymentDetail.creditcvc.length > 3) {
        setTimeout(() => {
          this.paymentDetail.creditcvc = this.paymentDetail.creditcvc.substr(0, 3);
        }, 0);
      }
    }

    if (this.paymentDetail.expdate) {
      setTimeout(() => {
        // this.paymentDetail.expdate = pattern.exec(this.paymentDetail.expdate);
        if (this.paymentDetail.expdate && this.paymentDetail.expdate.length === 4) {
          if (this.paymentDetail.expdate.indexOf('/') === -1) {
            this.paymentDetail.expdate = this.paymentDetail.expdate.substr(0, 2) + '/' + this.paymentDetail.expdate.substr(2, 4);
          }
          this.paymentDetail.expdate = this.paymentDetail.expdate;
        } else if (this.paymentDetail.expdate && this.paymentDetail.expdate.length > 5) {
          setTimeout(() => {
            this.paymentDetail.expdate = this.paymentDetail.expdate.substr(0, 5);
          }, 0);
        }
      }, 0);
    }
  }

}
