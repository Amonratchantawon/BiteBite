import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { ShopProvider } from '../../providers/shop/shop';
import { ShopModel } from '../../assets/model/shop.model';
import { GalleryModal } from 'ionic-gallery-modal';
import { LoadingProvider } from '../../providers/loading/loading';
import { TranslateService } from '@ngx-translate/core';
import { AlertProvider } from '../../providers/alert/alert';
import { Constants } from '../../app/app.constants';
import { CartProvider } from '../../providers/cart/cart';

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  shopData: ShopModel = new ShopModel();
  isO: string;
  index: number = 1;
  selectedCateId: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shop: ShopProvider,
    private modalCtrl: ModalController,
    private loading: LoadingProvider,
    private translate: TranslateService,
    private alert: AlertProvider,
    private cartProvider: CartProvider
  ) {
  }

  ionViewDidLoad() {
    this.getShop();
  }

  getShop() {
    let _id = this.navParams.data;
    console.log(_id);
    this.loading.onLoading();
    this.shop.getShopDetail().then((res) => {
      this.shopData = res;
      this.selectedCateId = this.shopData.categories[0]._id;
      window.localStorage.setItem('select_shop@' + Constants.URL, JSON.stringify(this.shopData));
      this.checkOpenShop();
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      let language = this.translate.currentLang;
      if (language === 'th') {
        this.alert.onAlert('ร้านค้า', 'โหลดข้อมูลร้านค้าล้มเหลว', 'ตกลง');
      } else if (language === 'en') {
        this.alert.onAlert('Restaurant', 'Error loading restaurant.', 'OK');
      }
    });
  }

  checkOpenShop() {
    if (this.shopData.isopen) {
      this.isO = 'OPEN';
    } else {
      this.isO = 'CLOSE'
    }
  }

  showPhoto(index) {
    let photos = [];
    for (let i = 0; i < this.shopData.promoteimage.length; i++) {
      let element = this.shopData.promoteimage[i];
      photos.push({
        url: element,
        type: '.png',
      });
    }
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: photos,
      initialSlide: index
    });
    modal.present();
  }

  selectCate(i, cate) {
    this.index = i;
    this.selectedCateId = cate ? cate._id : '';
  }

  selectProduct(e) {
    let modal1 = this.modalCtrl.create('ProductDetailPage', { product: e });
    modal1.present();
  }

  getBadge() {
    return this.cartProvider.getBadgeCartByShop();
  }

  goToCart() {
    this.navCtrl.push('CartPage');
  }

  seeAllProduct() {
    this.navCtrl.push('ProductListPage');
  }
}
