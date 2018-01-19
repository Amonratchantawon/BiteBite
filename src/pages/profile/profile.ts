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
    this.makeProfile = [{
      rank: 1,
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Sunny_at_Incheon_Airport_on_May_20%2C_2015.jpg',
      value: 90
    },
    {
      rank: 2,
      image: this.user.profileImageURL,
      value: 90
    },
    {
      rank: 3,
      image: 'https://i.ytimg.com/vi/Cz1EcFnoNmU/maxresdefault.jpg',
      value: 70
    },
    {
      rank: 4,
      image: 'http://tv.bectero.com/wp-content/uploads/2017/07/big_147202988557bd64bdb8560.jpg',
      value: 65
    },
    {
      rank: 5,
      image: 'http://kpop.youzab.com/wp-content/uploads/2017/10/Girls-Generation-YoonA.jpg',
      value: 60
    },
    {
      rank: 6,
      image: 'https://1.soompi.io/wp-content/blogs.dir/12/files/2013/11/girls-generation-seohyun-wide.jpg',
      value: 55
    },
    {
      rank: 7,
      image: 'https://sites.google.com/site/soshichotima/_/rsrc/1468857530546/-suny/-suny/-hyoyeon/922a6f268d22132177ab39f9d304555e.jpg?height=300&width=400',
      value: 53
    },
    {
      rank: 8,
      image: 'https://image.dek-d.com/27/0456/5187/120458333',
      value: 50
    },
    {
      rank: 9,
      image: 'https://1.bp.blogspot.com/-cyY0fYSWpys/VwYDtSPoAvI/AAAAAAAAAFg/Wop9RnoATmUhO81_FznYMkHtoqZ-r-VbA/s1600/7ce499706e4c7712d5a64ba46c453dfc.jpg',
      value: 45
    },
    {
      rank: 10,
      image: 'http://topicstock.pantip.com/chalermkrung/topicstock/2011/03/C10370545/C10370545-7.jpg',
      value: 35
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
