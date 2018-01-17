import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TranslateService } from '@ngx-translate/core';
import { AlertProvider } from '../../providers/alert/alert';
import { LoadingProvider } from '../../providers/loading/loading';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  inApp: Boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: Facebook,
    private translate: TranslateService,
    private alert: AlertProvider,
    private loading: LoadingProvider,
    private auth: AuthProvider,
  ) {
    // ไม่แสดงปุ่ม skip เพราะเข้ามาจากทาง login มีปุ่มย้อนกลับ
    // กรณีเข้ามาครั้งแรกจะมีปุ่ม skip ให้กดได้
    this.inApp = this.navParams.data ? this.navParams.data.inApp : false;
  }

  ionViewDidLoad() {

  }

  onSkip() {
    this.navCtrl.push('NavtabsPage');
  }

  onFacebook() { //'user_birthday'
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.fb.api('me?fields=id,first_name,last_name,email,birthday,gender,picture.width(300).height(300)', null).then((user) => {
          user.username = user.email;
          user.password = 'FB@Pass1234';
          this.authenFB(user);
        })
          .catch(e => {
            if (this.translate.currentLang === 'th') {
              this.alert.onAlert('การเชื่อมต่อเฟสบุ๊ค', 'ผิดพลาด', 'ตกลง');
            } else if (this.translate.currentLang === 'en') {
              this.alert.onAlert('Facebook connect', 'Error logging into Facebook', 'OK');
            }
          })
      })
      .catch(e => { });
  }

  onEmail() {
    this.navCtrl.push('RegisterAccountPage', { inApp: this.inApp });
  }

  authenFB(user) {

    let credential = {
      username: user.username,
      password: user.password
    };
    this.loading.onLoading();
    this.auth.login(credential).then((res) => {
      if (this.inApp) {
        // กรณีเข้ามาใน app แล้ว จะ pop กลับไปหน้าที่สั่งให้เปิด
        // this.navCtrl.setRoot(window.localStorage.getItem('current_page_for_login'));
        this.navCtrl.setRoot('NavtabsPage');
      } else {
        // กรณีเข้ามาครั้งแรก ไปหน้าแรก
        this.navCtrl.push('NavtabsPage');
      }
      this.loading.dismiss();
    }).catch((err) => {
      if (err.message === 'Invalid password') {
        let language = this.translate.currentLang;
        if (language === 'th') {
          this.alert.onAlert('แจ้งเตือน', 'ชื่อบัญชีนี้มีผู้ใช้งานแล้ว', 'ตกลง');
        } else if (language === 'en') {
          this.alert.onAlert('Wraning', 'Username is already exists.', 'OK');
        }
      } else {
        this.navCtrl.push('RegisterProfilePage', { provider: 'fb', data: user, inApp: this.inApp });
      }
      this.loading.dismiss();
    });
  }

}
