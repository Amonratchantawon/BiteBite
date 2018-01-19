import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { LoadingProvider } from '../../providers/loading/loading';
import { ProductDetailModel } from '../../assets/model/product-detail.model';
import { CartProvider } from '../../providers/cart/cart';

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  products: Array<ProductDetailModel> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private product: ProductProvider,
    private loading: LoadingProvider,
    private modalCtrl: ModalController,
    private cartProvider: CartProvider
  ) {
  }

  ionViewDidLoad() {
    this.getProductsByShop();
  }

  getProductsByShop() {
    this.loading.onLoading();
    this.product.getProductsByShop().then((res) => {
      this.products = res;
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
    });
  }

  selectProduct(e) {
    console.log(e);
    let modal1 = this.modalCtrl.create('ProductDetailPage', { product: e });
    modal1.present();
  }

  getBadge() {
    return this.cartProvider.getBadgeCartByShop();
  }

  goToCart() {
    this.navCtrl.push('CartPage');
  }

}
