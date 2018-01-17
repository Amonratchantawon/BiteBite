import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the SettingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting-detail',
  templateUrl: 'setting-detail.html',
})
export class SettingDetailPage {

  languages: Array<any> = [{
    language: 'ENGLISH',
    json: 'en'
  }, {
    language: 'THAI',
    json: 'th'
  }];
  language: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService
  ) {
  }

  ionViewWillEnter() {
    this.language = this.translate.currentLang;
    console.log(this.language);
  }

  selectLanguage() {
    this.translate.use(this.language)
  }

}
