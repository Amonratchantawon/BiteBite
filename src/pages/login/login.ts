import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TranslateService } from '@ngx-translate/core';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credentials: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private alert: AlertProvider,
    private translate: TranslateService,
    private loading: LoadingProvider,
    private fb: Facebook,
    private app: App
  ) {
  }

  ionViewWillEnter() {
    this.auth.authenticated().then((res) => {
      if (res) {
        setTimeout(() => {
          this.navCtrl.setRoot(window.localStorage.getItem('current_page_for_login'));
        }, 0);
      }
    });
  }

  goRegister() {
    this.app.getRootNav().push('RegisterPage', { inApp: true });

  }

  onLogin(credentials) {
    this.loading.onLoading();
    this.auth.login(credentials).then((res) => {
      this.navCtrl.pop();
      this.loading.dismiss();
    }).catch((err) => {
      if (err.message === 'Invalid password') {
        let language = this.translate.currentLang;
        if (language === 'th') {
          this.alert.onAlert('เข้าสู่ระบบ', 'รหัสผ่านไม่ถูกต้อง', 'ตกลง');
        } else if (language === 'en') {
          this.alert.onAlert('Login', 'Invalid password.', 'OK');
        }
      } else if (err.message === 'Unknown user') {
        let language = this.translate.currentLang;
        if (language === 'th') {
          this.alert.onAlert('เข้าสู่ระบบ', 'อีเมล์ไม่ถูกต้อง', 'ตกลง');
        } else if (language === 'en') {
          this.alert.onAlert('Login', 'Unknown user.', 'OK');
        }
      } else if (err.message === 'User suspended') {
        let language = this.translate.currentLang;
        if (language === 'th') {
          this.alert.onAlert('เข้าสู่ระบบ', 'บัญชีถูกระงับการใช้งาน', 'ตกลง');
        } else if (language === 'en') {
          this.alert.onAlert('Login', 'This Account Has Been Suspended.', 'OK');
        }
      } else {
        let language = this.translate.currentLang;
        if (language === 'th') {
          this.alert.onAlert('เข้าสู่ระบบ', 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง', 'ตกลง');
        } else if (language === 'en') {
          this.alert.onAlert('Login', 'Error! please try again', 'OK');
        }
      }
      this.loading.dismiss();
    });
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

  authenFB(user) {
    let credentials = {
      username: user.email,
      password: 'FB@Pass1234'
    }
    this.loading.onLoading();
    this.auth.login(credentials).then((res) => {
      this.navCtrl.pop();
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
        this.app.getRootNav().push('RegisterProfilePage', { provider: 'fb', data: user, inApp: true });
      }
      this.loading.dismiss();
    });
  }

  goForgotPassword(){
    this.app.getRootNav().push('ForgotPasswordPage');
  }

}
