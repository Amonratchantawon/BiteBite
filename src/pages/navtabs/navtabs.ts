import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Tabs, Platform, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthProvider } from '../../providers/auth/auth';
import { Constants } from '../../app/app.constants';

/**
 * Generated class for the NavtabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-navtabs',
  templateUrl: 'navtabs.html'
})
export class NavtabsPage {
  @ViewChild('tabs') tabs: Tabs

  homeRoot = 'HomePage';
  recommentedRoot = 'RecommentedPage';
  rewardRoot = 'RewardPage';
  statusRoot = 'StatusPage';
  moreRoot = 'MorePage';

  icon: string = './assets/icon/reward.svg';
  color: string = '#EB3841';
  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private toastCtrl: ToastController,
    private translate: TranslateService,
    private auth: AuthProvider
  ) {
    platform.ready().then(() => {
      //back button handle
      //Registration of push in Android and Windows Phone
      var lastTimeBackPress = 0;
      var timePeriodToExit = 2000;

      platform.registerBackButtonAction(() => {
        //Double check to exit app
        if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
          this.platform.exitApp(); //Exit from app
        } else {
          let language = this.translate.currentLang;
          let message = '';
          if (language === 'th') {
            message = 'กดปุ่มย้อนกลับอีกครั้ง เพื่อออกจากแอปพลิเคชัน';
          } else if (language === 'en') {
            message = 'Press back again to exit App?'
          }
          let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          lastTimeBackPress = new Date().getTime();
        }
      });
    });
  }

  onReword() {
    this.tabs.select(2);
  }

  onSelectChange(e) {
    if (e === '0') {
      window.localStorage.setItem('current_page_for_login', 'HomePage');
      this.color = '#EB3841';
      let user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
      if (user) {
        this.auth.getDailyWelcome();
      }
    } else if (e === '1') {
      window.localStorage.setItem('current_page_for_login', 'RecommentedPage');
      this.color = '#EB3841';
    } else if (e === '2') {
      window.localStorage.setItem('current_page_for_login', 'RewardPage');
      this.color = '#b3222f';
    } else if (e === '3') {
      window.localStorage.setItem('current_page_for_login', 'StatusPage');
      this.color = '#EB3841';
    } else if (e === '4') {
      window.localStorage.setItem('current_page_for_login', 'MorePage');
      this.color = '#EB3841';
    }
    // let user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
    // if (user) {
    //   this.auth.getDailyWelcome();
    // }
  }
}
