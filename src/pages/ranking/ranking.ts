import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RankingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {
  makeProfile: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankingPage');
    this.makeProfile = [
      {
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
      },
      {
        rank: 6,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 60
      },
      {
        rank: 7,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 55
      },
      {
        rank: 8,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 54
      },
      {
        rank: 9,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 51
      },
      {
        rank: 10,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 50
      },
      {
        rank: 11,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 48
      },
      {
        rank: 12,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 45
      },
      {
        rank: 13,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 42
      },
      {
        rank: 14,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 40
      },
      {
        rank: 15,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 39
      },
      {
        rank: 16,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 35
      },
      {
        rank: 17,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 31
      },
      {
        rank: 18,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 29
      },
      {
        rank: 19,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 24
      },
      {
        rank: 20,
        image: 'https://www.sonypark360.net/wp-content/uploads/2017/08/profile-pictures.png',
        value: 20
      }];
  }

}
