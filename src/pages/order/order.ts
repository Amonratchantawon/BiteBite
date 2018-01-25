import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { UserModel } from '../../assets/model/user.model';
import { Constants } from '../../app/app.constants';
import { OrderModel } from '../../assets/model/order.model';
import { LoadingProvider } from '../../providers/loading/loading';

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
    private loading: LoadingProvider
  ) {
  }

  ionViewDidLoad() {

    let location = window.localStorage.getItem('native_map_location') ? JSON.parse(window.localStorage.getItem('native_map_location')) : null;

    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
    this.order = this.cartProvider.getCartByShop();
    this.order.shippingAddress = {
      name: this.user.displayName,
      tel: this.user.mobile,
      address: window.localStorage.getItem('native_map_address_detail'),
      addressDetail: '',
      location: location
    }
    this.order.discount = 0;
    this.order.distance = null;
  }

  ionViewWillEnter() {

    let location_old = window.localStorage.getItem('native_map_location_old') ? JSON.parse(window.localStorage.getItem('native_map_location_old')) : null;
    let location = window.localStorage.getItem('native_map_location') ? JSON.parse(window.localStorage.getItem('native_map_location')) : null;
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
    }, 3000);
  }

  confirmOrder() {
    console.log(this.order);
    this.navCtrl.push('ConfirmedPage');
  }
}
