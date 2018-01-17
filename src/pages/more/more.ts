import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { Constants } from '../../app/app.constants';
import { UserModel } from '../../assets/model/user.model';
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  user: UserModel = new UserModel();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private auth: AuthProvider,
    private alertCtrl: AlertProvider,
    private translate: TranslateService
  ) {
  }

  ionViewWillEnter() {
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
  }

  goToProfile() {
    this.app.getRootNav().push('ProfilePage');
  }

  onSetting() {
    this.app.getRootNav().push('SettingDetailPage');
  }

  goLogin() {
    this.navCtrl.push('LoginPage');
  }

  onNotification(){
    this.app.getRootNav().push('NotificationPage');    
  }

  onBenefit(){
    this.app.getRootNav().push('BenefitPage');    
  }

  onServiceCharge(){
    this.app.getRootNav().push('ServiceChargePage');    
  }

  onQA(){
    this.app.getRootNav().push('QuestionAnswerPage');    
  }

  onContact(){
    this.app.getRootNav().push('ContactBitebitePage');    
  }

  onJoin(){
    this.app.getRootNav().push('JoinBitebitePage');    
  }


  logout() {
    this.auth.logout();
    let language = this.translate.currentLang;
    if (language === 'th') {
      this.alertCtrl.onAlert('ลงชื่อออก สำเร็จ', '', 'ตกลง');
    } else if (language === 'en') {
      this.alertCtrl.onAlert('Logout Success.', '', 'Ok');
    }
    this.user = null;
  }

}
