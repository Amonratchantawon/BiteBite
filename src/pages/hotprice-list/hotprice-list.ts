import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HotpriceProvider } from '../../providers/hotprice/hotprice';
import { ItemHotpricesModel } from '../../assets/model/hotprice.model';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the HotpriceListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotprice-list',
  templateUrl: 'hotprice-list.html',
})
export class HotpriceListPage {
  hotpriceData: Array<ItemHotpricesModel> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private hotpriceProvider: HotpriceProvider,
    private loading: LoadingProvider
  ) {
  }

  ionViewDidLoad() {
    this.getHotprice();
  }

  getHotprice() {
    this.loading.onLoading();
    this.hotpriceProvider.getHotpriceData().then((data) => {
      this.hotpriceData = data;
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
    });
  }

  doRefresh(refresher) {
    this.getHotprice();
    refresher.complete();
  }

  goHotpriceShop(item) {
    this.navCtrl.push('ShopPage', item._id);
  }

}
