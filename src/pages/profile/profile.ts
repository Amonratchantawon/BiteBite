import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { UserModel } from '../../assets/model/user.model';
import { ShopProvider } from '../../providers/shop/shop';
// import { LoadingProvider } from '../../providers/loading/loading';
import { ItemShopModelMock } from '../../assets/model/shop.model';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: UserModel = new UserModel();

  isenabled: boolean = true;
  segment: String = 'collect';
  condition: string = '';
  shopData: Array<ItemShopModelMock> = [];
  makeProfile: Array<any> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // private loading: LoadingProvider,
    private shopProvider: ShopProvider,
  ) {
  }

  getShop() {
    // this.loading.onLoading();
    this.shopProvider.getShopsFavorite().then((data) => {
      this.shopData = data;
      // this.loading.dismiss();
    }, (err) => {
      // this.loading.dismiss();
    });
  }

  ionViewDidLoad() {
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
    if (this.user && this.user.gender) {
      this.user.gender = this.user.gender.toUpperCase();
    }
    this.makeProfile = [
      {
        rank: 2,
        // image: this.user.profileImageURL,
        image: 'https://www.shareicon.net/data/2016/08/18/813780_people_512x512.png',
        value: 90,
        check: 'me'
      }, {
        rank: 1,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 90,
        check: 'first'
      },
      {
        rank: 2,
        // image: this.user.profileImageURL,
        image: 'https://www.shareicon.net/data/2016/08/18/813780_people_512x512.png',
        value: 90,
        check: 'second'
      },
      {
        rank: 3,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 70,
        check: 'third'
      },
      {
        rank: 4,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 65
      },
      {
        rank: 5,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 60
      }];
  }

  segmentChanged(e) {
    if (this.segment === 'favorite') {
      this.getShop();
    }
  }

  onToAddress() {
    this.navCtrl.push('AddressPage');
  }

  ProfileEditPage() {
    this.navCtrl.push('ProfileEditPage');
  }
  gotoHistoryDetail(){
    this.navCtrl.push('HistoryDetailPage')
  }
  gotoSeeAll(){
    this.navCtrl.push('RankingPage')
  }

  goToFavoritDetail(e) {
    this.navCtrl.push('ShopPage', e._id);
  }
}
