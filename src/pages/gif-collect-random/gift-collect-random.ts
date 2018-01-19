import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
// import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the GifCollectRandomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gift-collect-random',
  templateUrl: 'gift-collect-random.html',
})
export class GiftCollectRandomPage {
  gifImage: string = './assets/icon/gift/gift-box-close.png';
  success: Boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    // private loading: LoadingProvider
  ) {
  }

  ionViewDidLoad() {

  }

  onDismiss() {
    this.viewCtrl.dismiss();
  }

  getGift() {
    // this.loading.onLoading();
    this.success = true;
    setTimeout(() => {
      this.gifImage = './assets/icon/gift/vehicle3.png';
      // this.loading.dismiss();
    }, 1000);
  }

}
