import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProductDetailModel } from '../../assets/model/product-detail.model';
import { CartProvider } from '../../providers/cart/cart';
// import { ProductProvider } from '../../providers/product/product';
// import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  productData: ProductDetailModel = new ProductDetailModel();
  remark: string = '';
  numberCount: number = 1;
  amount: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private cartProvider: CartProvider
    // private productProvider: ProductProvider,
    // private loading: LoadingProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
    this.getProductDetail();
  }

  getProductDetail() {
    // this.loading.onLoading();
    // this.productProvider.getProductDetail().then((res) => {
    //   this.productData = res;
    //   this.countPrice();
    //   this.loading.dismiss();      
    // }, (err) => {
    //   this.loading.dismiss();
    // });
    this.productData = this.navParams.get('product');
    this.productData.images = [];
    this.productData.images[0] = this.navParams.get('product').image;
    this.countPrice();
  }

  countDelete() {
    if (this.numberCount > 1) {
      this.numberCount -= 1;
    }
    this.countPrice();
  }

  countPlus() {
    this.numberCount += 1;
    this.countPrice();
  }

  countPrice() {
    this.amount = this.productData.price * this.numberCount;
  }
  close() {
    this.viewCtrl.dismiss();
  }

  addToCart() {
    let product = {
      product: this.productData,
      remark: this.remark,
      qty: this.numberCount,
      amount: this.amount

    };
    this.cartProvider.addToCart(product);
    this.viewCtrl.dismiss();
  }
}
