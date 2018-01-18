import { RegisterGiftModel } from '../../../www/assets/model/register-gift.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Constants } from '../../app/app.constants';

/**
 * Generated class for the ShopinterestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopinterest',
  templateUrl: 'shopinterest.html',
})
export class ShopinterestPage {

  user: RegisterGiftModel = new RegisterGiftModel();
  inApp: Boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopinterestPage');
    this.inApp = this.navParams.data ? this.navParams.data.inApp : false;
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
  }

  shopinterest(){
    // this.user.newregisterreward.items = null;
      if (!this.user.newregisterreward || !this.user.newregisterreward.items|| this.user.newregisterreward.items.length === 0) {
        this.navCtrl.setRoot('NavtabsPage');
      } else{
        this.navCtrl.push('RegisterGiftPage', {inApp: this.inApp, user: this.user });
      }
  }
  selectCate(){
    alert('sssss');
  }
}
