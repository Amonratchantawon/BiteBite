import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { TranslateService } from '@ngx-translate/core';
import { CategoryListModel } from '../../assets/model/category-list.model';
import { ItemCategoriyModel } from '../../assets/model/category-master.model';
import { CategoryProvider } from '../../providers/category/category';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {

  categoryData: Array<ItemCategoriyModel>;
  shopByCate: Array<CategoryListModel>;
  pages: any = 0;
  cate: any;
  _id: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private categoryProvider: CategoryProvider,
    private geolocation: Geolocation,
    private loading: LoadingProvider,
    private platform: Platform,
    private translate: TranslateService,
    private alert: AlertProvider,
  ) {

  }

  ionViewWillEnter() {
    this.getCate();
  }

  getCate() {
    this.loading.onLoading();
    this.categoryProvider.getCategory().then(res => {
      this.categoryData = res;
      this.cate = this.navParams.get('index');
      this._id = this.navParams.get('item')._id;
      setTimeout(() => {
        let scroll = document.getElementById('scroll');
        scroll.scrollLeft = 90 * this.cate;
      }, 0);
      this.loading.dismiss();      
      this.getCurrentPosition();
    }, (err) => {
      this.loading.dismiss();      
    });
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
      this.getShopByCate(location);
      console.log('Browser debugger');
      return;
    }

    this.geolocation.getCurrentPosition().then((location) => {
      this.getShopByCate(location);
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

  getShopByCate(location) {
    this.categoryProvider.getShopListByCategory(this._id, location).then(res => {
      this.shopByCate = res;
      this.loading.dismiss();
    }, (err) => {
      let language = this.translate.currentLang;
      if (language === 'th') {
        this.alert.onAlert('ร้านค้า', 'โหลดข้อมูลผิดพลาด กรุณาลองอีกครั้ง', 'ตกลง');
      } else if (language === 'en') {
        this.alert.onAlert('Restaurant', 'Load data error.', 'OK');
      }
    });
  }

  onSelectedPage(index) { // selected category
    this.pages = index;
  }

  selectedCategory(index, item) {
    this.cate = index;
    this._id = item._id;
    this.getCurrentPosition();
  }

}
