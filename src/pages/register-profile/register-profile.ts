import { ShopInterestModel } from '../../assets/model/shopinterest.model';
import { ShopinterestProvider } from '../../providers/shopinterest/shopinterest';
import { PromotionInterestModel } from '../../assets/model/promotioninterest.model';
import { PromotioninterestProvider } from '../../providers/promotioninterest/promotioninterest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-register-profile',
  templateUrl: 'register-profile.html',
})
export class RegisterProfilePage {
  promotioninterestPost:Array<any> = [];
  promotioninterestData:PromotionInterestModel = new PromotionInterestModel();
  shopinterestPost:Array<any> = [];
  shopinterestData:ShopInterestModel = new ShopInterestModel();
  inApp: Boolean = false;
  birthday: string;
  provider: string;
  user: any = {};
  isDisabled:boolean = false;
  language: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private loading: LoadingProvider,
    private translate: TranslateService,
    private alert: AlertProvider,
    public promotioninterestProvider:PromotioninterestProvider,
    public shopinterestProvider:ShopinterestProvider
  ) {

    this.inApp = this.navParams.data ? this.navParams.data.inApp : false;
    this.provider = this.navParams.get('provider');
    if (this.provider === 'fb') {
      let fb_user = this.navParams.get('data');
      this.user.username = fb_user.username;
      this.user.password = fb_user.password;
      this.user.profileImageURL = fb_user.picture.data.url;
      this.user.firstName = fb_user.first_name;
      this.user.lastName = fb_user.last_name;
      this.user.gender = fb_user.gender;
      this.user.email = fb_user.email;
      this.birthday = fb_user.birthday ? new Date(fb_user.birthday).toISOString() : '';

    } else if (this.provider === 'local') {
      this.user = this.navParams.get('data');
      this.user.profileImageURL = 'https://eatsyd.herokuapp.com/modules/users/client/img/profile/default.png';
    }
    this.isDisabled =  this.user.email ? true : false;
  }

 
  ionViewWillEnter(){
    this.promotionInterest();
    this.changeShopInterest();
    this.onLanguage();
  }

  onLanguage() {
    this.language = this.translate.currentLang;
  }

  onRegister() {

    let date = new Date(this.birthday);
    this.user.dateOfBirth = date;
    this.loading.onLoading();
    this.auth.signup(this.user).then((res) => {
      // res.newregisterreward.items = null;
      let userinterest = {
        promotioninterest:this.promotioninterestPost,
        shopinterest:this.shopinterestPost
      }
      this.shopinterestProvider.postUserinter(userinterest);
      if (!res.newregisterreward || !res.newregisterreward.items|| res.newregisterreward.items.length === 0) {
        this.navCtrl.setRoot('NavtabsPage');
      } else{
        this.navCtrl.push('RegisterGiftPage', {inApp: this.inApp, user: res });
      }
      this.loading.dismiss();
    }).catch((err) => {
      let language = this.translate.currentLang;

      if (err.message === 'Please fill a valid email address') {
        if (language === 'th') {
          this.alert.onAlert('สมัครสมาชิก', 'อีเมล์ไม่ถูกต้อง กรุณากรอกให้ถูกต้อง', 'ตกลง');
        } else if (language === 'en') {
          this.alert.onAlert('Register', 'Please fill a valid email address.', 'OK');
        }
      }
      this.loading.dismiss();
    });
  }

  changeShopInterest(){
    this.shopinterestProvider.getShopInterest().then((res)=>{
      this.shopinterestData = res;
    })
  }

  promotionInterest(){
    this.promotioninterestProvider.getPromotionInterest().then((res)=>{
      this.promotioninterestData = res;
    })
  }

  checkData(){
    console.log(this.shopinterestPost);
    console.log(this.promotioninterestPost);
  }

}
