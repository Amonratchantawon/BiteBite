import { RewardModel } from '../../assets/model/reward.model';
import { RewardProvider } from '../../providers/reward/reward';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { UserModel } from '../../assets/model/user.model';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-reward',
  templateUrl: 'reward.html',
})
export class RewardPage {
  user: UserModel = new UserModel();
  rewardData: RewardModel = new RewardModel()
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private reward: RewardProvider,
    private loading: LoadingProvider
  ) {
  }

  ionViewWillEnter() {
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
    this.getReward();
  }

  goToProfile() {
    this.app.getRootNav().push('ProfilePage');
  }

  getReward() {
    this.loading.onLoading();
    this.reward.getRewardService().then((res) => {
      this.rewardData = res;
      this.loading.dismiss();
    }, (err) => {
      console.log(err);
      this.loading.dismiss();
    })
  }


}
