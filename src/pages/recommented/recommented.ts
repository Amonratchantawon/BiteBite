import { Component, ViewChild } from '@angular/core';
import { IonicPage, App, NavController, Content } from 'ionic-angular';
import { ReviewModel } from '../../assets/model/review.model';
import { ReviewProvider } from '../../providers/review/review';
import { AuthProvider } from '../../providers/auth/auth';
import { UserModel } from '../../assets/model/user.model';
import { LoadingProvider } from '../../providers/loading/loading';
import { Constants } from '../../app/app.constants';

import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
@IonicPage()
@Component({
  selector: 'page-recommented',
  templateUrl: 'recommented.html',
})
export class RecommentedPage {
  @ViewChild(Content) content: Content;
  searchText: string = '';
  user: UserModel = new UserModel();
  dataReview: Array<ReviewModel>;
  dataReviewPaging: Array<any> = [];
  isInfinite: Boolean = false;
  constructor(
    public navCtrl: NavController,
    private reviewProvider: ReviewProvider,
    private app: App,
    private auth: AuthProvider,
    private loading: LoadingProvider,
    private translate: TranslateService
  ) {
  }

  ionViewWillEnter() {
    this.isInfinite = false;
    this.auth.authenticated().then((res) => {
      if (res) {
        this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
        this.getReview();
      } else {
        this.user = null;
        this.dataReview = [];
        this.navCtrl.push('LoginPage');
      }
    });
  }

  getReview() {
    this.loading.onLoading();
    this.reviewProvider.getReviews().then(res => {
      // this.dataReview = res;
      this.doPaging(res);
      this.loading.dismiss();
    }).catch(err => {
      console.log(err);
      this.loading.dismiss();
    });
  }

  doRefresh(refresher) {
    this.getReview();
    refresher.complete();
  }

  goToProfile() {
    this.app.getRootNav().push('ProfilePage');
  }

  findShopReview() {
    this.app.getRootNav().push('FindShopReviewPage');
  }

  getMoment(date) {
    let language = this.translate.currentLang;
    if (language === 'th') {
      moment.locale('th');
    } else if (language === 'en') {
      moment.locale('en');
    }
    return moment(date).startOf('minute').fromNow();
  }

  isLike(item, i) {

    this.dataReview[i].islike = !this.dataReview[i].islike;
    if (this.dataReview[i].islike) {
      this.dataReview[i].countlike++;
    } else {
      this.dataReview[i].countlike--;
    }

    this.reviewProvider.like(item._id).then((res) => {
      this.dataReview[i].islike = res.islike;
      this.dataReview[i].countlike = res.countlike;
    });
  }

  doPaging(data) {

    this.content.scrollToTop();
    let maxLength = 10;
    this.dataReviewPaging = [];
    this.dataReview = [];
    if (maxLength > 0) {
      let pages = data.length / maxLength;
      let paper = 0;
      for (let i = 0; i < pages; i++) {
        this.dataReviewPaging.push(data.slice(paper, paper + maxLength));
        paper += maxLength;
      }

      this.dataReview = this.dataReviewPaging[0];
      this.dataReviewPaging.splice(0, 1);
    } else {
      this.dataReview = data;
    }
    setTimeout(() => {
      this.isInfinite = true;
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    if (this.isInfinite) {
      setTimeout(() => {
        if (this.dataReviewPaging.length > 0) {
          this.dataReview = this.dataReview.concat(this.dataReviewPaging[0]);
          this.dataReviewPaging.splice(0, 1);
        }
        infiniteScroll.complete();
      }, 500);
    } else {
      infiniteScroll.complete();
    }
  }

}
