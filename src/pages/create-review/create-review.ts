import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { ReviewProvider } from '../../providers/review/review';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { UserModel } from '../../assets/model/user.model';
import { Constants } from '../../app/app.constants';

/**
 * Generated class for the CreateReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-review',
  templateUrl: 'create-review.html',
})
export class CreateReviewPage {
  @ViewChild('myInput') myInput: ElementRef;
  review: any = {};
  maxLengthTitle: number = 30;
  maxLengthDetail: number = 70;
  user: UserModel = new UserModel();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private reviewProvider: ReviewProvider,
    private loading: LoadingProvider,
    private alert: AlertProvider,
    private translate: TranslateService
  ) {
    this.review.image = this.navParams.get('image');
    this.review.title = '';
    this.review.description = '';
  }

  ionViewWillEnter() {
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
  }

  maxLengthTit() {
    if (this.review.title.length > this.maxLengthTitle) {
      setTimeout(() => {
        this.review.title = this.review.title.substring(0, this.maxLengthTitle);
      }, 0);
    }
  }

  maxLengthDesc() {
    if (this.review.description.length > this.maxLengthDetail) {
      setTimeout(() => {
        this.review.description = this.review.description.substring(0, this.maxLengthDetail);
      }, 0);
    }
  }

  createRevirw() {
    this.loading.onLoading();
    this.reviewProvider.postReviews(this.review).then((res) => {
      this.loading.dismiss();
      this.navCtrl.setRoot('NavtabsPage');
    }, (err) => {
      this.loading.dismiss();
      let language = this.translate.currentLang;
      if (language === 'th') {
        this.alert.onAlert('รีวิว', 'เกิดข้อผิดพลาด', 'ตกลง');
      } else {
        this.alert.onAlert('Review', 'Error', 'OK');
      }
    });
  }

}
