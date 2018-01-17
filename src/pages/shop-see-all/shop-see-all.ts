import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { TranslateService } from '@ngx-translate/core';
import { ShopProvider } from '../../providers/shop/shop';
import { ItemShopModel } from '../../assets/model/shop.model';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-shop-see-all',
  templateUrl: 'shop-see-all.html',
})
export class ShopSeeAllPage {
  shopData: Array<ItemShopModel> = [];
  condition: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shopProvider: ShopProvider,
    private loading: LoadingProvider,
    private geolocation: Geolocation,
    private translate: TranslateService,
    private alert: AlertProvider,
    private platform: Platform
  ) {
  }

  ionViewDidLoad() {
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
      this.getShop(location);
      console.log('Browser debugger');
      return;
    }

    this.geolocation.getCurrentPosition().then((location) => {
      this.getShop(location);
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

  getShop(location) {
    this.condition = this.navParams.data;
    this.shopProvider.getShopsByCondition(this.condition, location).then((data) => {
      this.shopData = data;
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
    });
  }

  doRefresh(refresher) {
    this.getCurrentPosition();
    setTimeout(() => {
      refresher.complete();
    }, 500);
  }

  goToDetail(e) {
    this.navCtrl.push('ShopPage', e._id);
  }

}
