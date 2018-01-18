import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { UserModel } from '../../assets/model/user.model';
import { ShopProvider } from '../../providers/shop/shop';
import { LoadingProvider } from '../../providers/loading/loading';
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
  // displayName = "อมรรัตน์ จันทะวร";
  isenabled: boolean = true;
  Edit = "create";
  segment: String = 'collect';
  condition: string = '';
  shopData: Array<ItemShopModelMock> = [];
  makeProfile: Array<any> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loading: LoadingProvider,
    private shopProvider: ShopProvider,
  ) {
  }

  getShop() {
    this.loading.onLoading();
    this.shopProvider.getShopsFavorite().then((data) => {
      this.shopData = data;
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
    });
  }

  ionViewDidLoad() {
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
    if (this.user && this.user.gender) {
      this.user.gender = this.user.gender.toUpperCase();
    }
    this.makeProfile = [{
      rank: 1,
      name: this.user.displayName,
      image: this.user.profileImageURL,
      coin: 50000
    },
    {
      rank: 2,
      name: this.user.displayName,
      image: this.user.profileImageURL,
      coin: 50000
    },
    {
      rank: 3,
      name: this.user.displayName,
      image: this.user.profileImageURL,
      coin: 50000
    },
    {
      rank: 4,
      name: this.user.displayName,
      image: this.user.profileImageURL,
      coin: 50000
    },
    {
      rank: 5,
      name: this.user.displayName,
      image: this.user.profileImageURL,
      coin: 50000
    },
    {
      rank: 6,
      name: this.user.displayName,
      image: this.user.profileImageURL,
      coin: 50000
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

}
