import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { LoadingProvider } from '../../providers/loading/loading';

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
  isSpin: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingProvider
  ) {
  }

  ionViewDidLoad() {
    // this.loadingCtrl.onLoading();
    setTimeout(() => {
      // this.loadingCtrl.dismiss();
      this.isSpin = false;
    }, 5000);
    console.log('ionViewDidLoad ConfirmedPage');
  }

  payment() {
    this.navCtrl.push('PaymentPage');
  }
}
