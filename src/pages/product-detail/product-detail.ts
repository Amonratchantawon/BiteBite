import { ProductDetailModel } from '../../assets/model/product-detail.model';
import { ProductProvider } from '../../providers/product/product';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  productData: ProductDetailModel = new ProductDetailModel();
  numberCount: number = 1;
  amount: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productProvider: ProductProvider,
    private viewCtrl: ViewController,
    private loading: LoadingProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
    this.getProductDetail();
  }

  getProductDetail() {
    this.loading.onLoading();
    this.productProvider.getProductDetail().then((res) => {
      this.productData = res;
      this.countPrice();
      this.loading.dismiss();      
    }, (err) => {
      this.loading.dismiss();
    });
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

  addToCartSusses() {
    this.viewCtrl.dismiss();
  }
}
