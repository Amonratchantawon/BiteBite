import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController, App, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { TranslateService } from '@ngx-translate/core';
import { HomeProvider } from '../../providers/home/home';
import { HomeModel } from '../../assets/model/home.model';
import { LoadingProvider } from '../../providers/loading/loading';
import { Constants } from '../../app/app.constants';
import { UserModel } from '../../assets/model/user.model';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('ads') ads: Slides;
  homeData: HomeModel = new HomeModel();
  user: UserModel = new UserModel();
  pages: any = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private home: HomeProvider,
    private modalCtrl: ModalController,
    private app: App,
    private loading: LoadingProvider,
    private geolocation: Geolocation,
    private translate: TranslateService,
    private alert: AlertProvider,
    private platform: Platform
  ) {
  }

  ionViewWillEnter() {
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
    this.getCurrentPosition();
  }

  getCurrentPosition() {
    this.loading.onLoading();

    if (!this.platform.is('cordova')) { // serve test location in lumlukka
      let location = {
        coords: {
          latitude: 13.9323555,
          longitude: 100.7178317
        }
      }
      this.getdata(location);
      console.log('Browser debugger');
      return;
    }

    this.geolocation.getCurrentPosition().then((location) => {
      this.getdata(location);
    }).catch((error) => {
      this.loading.dismiss();
      let language = this.translate.currentLang;
      if (language === 'th') {
        this.alert.onAlert('ตำแหน่ง', 'ค้นหาตำแหน่งผิดพลาด กรุณาตรวจสอบ GPS', 'ตกลง');
      } else if (language === 'en') {
        this.alert.onAlert('Location', 'Error! Please check your GPS.', 'OK');
      }
    });
  }

  getdata(location) {
    setTimeout(() => {
      this.home.getHomeData(location).then(data => {
        this.homeData = data;
        this.loading.dismiss();
      }, (err) => {
        this.loading.dismiss();
      })
    }, 1000);
  }

  doRefresh(refresher) {
    this.getCurrentPosition();
    refresher.complete();
  }

  onSelectedPage(index) { // selected category
    this.pages = index;
  }

  openAds(item) {
    console.log(item);
    if (item.isvideo === true) {
      let profileModal = this.modalCtrl.create('VideoContentPage', { _id: item._id });
      profileModal.present();
    } else {
      let profileModal = this.modalCtrl.create('ImageContentPage', { _id: item._id });
      profileModal.present();
    }
  }

  clickHotPrice() {
    this.app.getRootNav().push('HotpriceListPage');
  }

  categoryPage(index, item) {
    this.app.getRootNav().push('CategoryListPage', { index: index, item: item });
  }

  seeAllByCondition(condition) {
    this.app.getRootNav().push('ShopSeeAllPage', condition);
  }
  goToProfile() {
    this.app.getRootNav().push('ProfilePage');
  }

  goHotpriceShop(e) {
    this.app.getRootNav().push('ShopPage', e.shop);
  }

  goToShop(e) {
    this.app.getRootNav().push('ShopPage', e._id);
  }

}
