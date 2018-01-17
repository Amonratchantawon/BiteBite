import { ProductDetailModel } from '../../assets/model/product-detail.model';
import { ProductdetailProvider } from '../../providers/productdetail/productdetail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  productData: ProductDetailModel = new ProductDetailModel();
  numberCount: number = 1;
  amount: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public productdetailProvider: ProductdetailProvider,public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
    this.getProductDetail();
  }

  getProductDetail() {
    this.productdetailProvider.getProductDetail().then((res) => {
      console.log(res);
      this.productData = res;
      this.countPrice();
    }, (err) => {
      // this.loading.dismiss();
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
  close(){
    this.viewCtrl.dismiss();
  }

  addToCartSusses(){
    this.viewCtrl.dismiss();
  }
}
