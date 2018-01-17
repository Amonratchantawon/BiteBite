import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Constants } from '../../app/app.constants';

/**
 * Generated class for the AgreementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agreement',
  templateUrl: 'agreement.html',
})
export class AgreementPage {
  isShowAgreementBtn: boolean = false;
  language: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgreementPage');
    this.onLanguage();
  }

  doInfinite(infiniteScroll) {
    this.isShowAgreementBtn = true;
    infiniteScroll.complete();
  }

  agreement() {
    let agr = {
      agreement_date: new Date(),
      status: true
    }
    window.localStorage.setItem('Agreement@' + Constants.URL, JSON.stringify(agr));
    this.navCtrl.push('RegisterPage');
  }

  onLanguage() {
    this.language = this.translate.currentLang;
  }

}
