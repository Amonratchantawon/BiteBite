import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {
  type: string = 'RESTAURANT';
  search: any;
  title: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.search = this.navParams.get('items');
    this.title = this.navParams.get('keyword');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultPage');
  }

  goToDetail(e) {
    this.navCtrl.push('ShopPage', e._id);
  }


}
