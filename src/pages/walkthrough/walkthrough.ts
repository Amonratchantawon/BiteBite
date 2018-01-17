import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WalkthroughPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-walkthrough',
  templateUrl: 'walkthrough.html',
})
export class WalkthroughPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalkthroughPage');
  }

  goToLogin(){
    // this.navCtrl.push('RegisterPage');
    this.navCtrl.push('AgreementPage');
  }

}
