import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { UserModel } from '../../assets/model/user.model';
import { Constants } from '../../app/app.constants';
import { OrderModel } from '../../assets/model/order.model';
import { LoadingProvider } from '../../providers/loading/loading';
import { OrderProvider } from '../../providers/order/order';
import { TranslateService } from '@ngx-translate/core';
import { AlertProvider } from '../../providers/alert/alert';
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
  @ViewChild(Content) content: Content;
  order: OrderModel = new OrderModel();
  user: UserModel = new UserModel();
  couponCode: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartProvider: CartProvider,
    private loading: LoadingProvider,
    private orderProvider: OrderProvider,
    private translate: TranslateService,
    private alert: AlertProvider
  ) {
  }

  // ionViewDidLoad() {

  //   this.auth.authenticated().then((res) => {
  //     if (res) {
  //       let location = window.localStorage.getItem('native_map_location') ? JSON.parse(window.localStorage.getItem('native_map_location')) : null;

  //       this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
  //       this.order = this.cartProvider.getCartByShop();
  //       this.order.shippingAddress = {
  //         name: this.user.displayName,
  //         tel: this.user.mobile,
  //         address: window.localStorage.getItem('native_map_address_detail'),
  //         addressDetail: '',
  //         location: location
  //       }
  //       this.order.discount = 0;
  //       this.order.distance = null;
  //     } else {
  //       this.user = null;
  //       this.navCtrl.push('LoginPage');
  //     }
  //   });

  // }

  ionViewWillEnter() {

    let location_old = window.localStorage.getItem('native_map_location_old') ? JSON.parse(window.localStorage.getItem('native_map_location_old')) : null;
    let location = window.localStorage.getItem('native_map_location') ? JSON.parse(window.localStorage.getItem('native_map_location')) : null;
    this.order = this.cartProvider.getCartByShop();
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
    if (location_old) {
      if (location_old.lat !== location.lat || location_old.lng !== location.lng) {
        this.order.distance = null;
      }
    }
    this.order.shippingAddress = {
      name: this.user.displayName,
      tel: this.user.mobile,
      address: window.localStorage.getItem('native_map_address_detail'),
      addressDetail: '',
      location: location
    }

  }

  openMap() {
    window.localStorage.setItem('native_map_location_old', JSON.stringify(this.order.shippingAddress.location));
    this.navCtrl.push('GoogleMapsPage');
  }


  applyCode() {

  }

  estimatedPrice() {
    this.loading.onLoading();
    setTimeout(() => {
      this.order.distance = 1;
      this.loading.dismiss();
      setTimeout(() => {
        this.content.scrollToBottom();
      }, 500);
    }, 1000);
  }

  confirmOrder() {
    console.log(this.order);
    this.loading.onLoading();
    this.orderProvider.saveOrder(this.order).then((res) => {
      this.navCtrl.push('ConfirmedPage', res);
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();      
      let language = this.translate.currentLang;
      if (language === 'th') {
        this.alert.onAlert('ออเดอร์', 'สั่งซื้อไม่สำเร็จ กรุณาลองใหม่อีกครั้ง', 'ตกลง');
      } else if (language === 'en') {
        this.alert.onAlert('Order', 'Order failed. Please try again.', 'OK');
      }
    });
  }
}
