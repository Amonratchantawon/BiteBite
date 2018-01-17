import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { TranslateService } from '@ngx-translate/core';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the RegisterAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-account',
  templateUrl: 'register-account.html',
})
export class RegisterAccountPage {
  inApp: Boolean = false;
  user: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private alert: AlertProvider,
    private translate: TranslateService,
    private loading: LoadingProvider
  ) {
    this.inApp = this.navParams.data ? this.navParams.data.inApp : false;
  }

  ionViewDidLoad() {
  }

  onNext() {
    this.user.username = this.user.email;
    this.loading.onLoading();
    this.auth.login(this.user).then((res) => {
      this.loading.dismiss();
      if (this.inApp) {
        // กรณีเข้ามาใน app แล้ว จะ pop กลับไปหน้าที่สั่งให้เปิด
        // this.navCtrl.setRoot(window.localStorage.getItem('current_page_for_login'));
        this.navCtrl.setRoot('NavtabsPage');
      } else {
        // กรณีเข้ามาครั้งแรก ไปหน้าแรก
        this.navCtrl.push('NavtabsPage');
      }
    }).catch((err) => {
      if (err.message === 'Invalid password' || err.message === 'User suspended') {
        let language = this.translate.currentLang;
        if (language === 'th') {
          this.alert.onAlert('แจ้งเตือน', 'อีเมล์นี้มีผู้ใช้งานแล้ว', 'ตกลง');
        } else if (language === 'en') {
          this.alert.onAlert('Wraning', 'Email is already exists.', 'OK');
        }
      } else {
        this.navCtrl.push('RegisterProfilePage', { provider: 'local', data: this.user, inApp: this.inApp });
      }
      this.loading.dismiss();
    });
  }

}
