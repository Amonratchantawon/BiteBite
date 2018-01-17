import { RewardModel } from '../../assets/model/reward.model';
import { RewardProvider } from '../../providers/reward/reward';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { UserModel } from '../../assets/model/user.model';

@IonicPage()
@Component({
  selector: 'page-reward',
  templateUrl: 'reward.html',
})
export class RewardPage {
  user: UserModel = new UserModel();
  rewardData:RewardModel = new RewardModel()
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    public reward:RewardProvider
  ) {
  }

  ionViewWillEnter() {
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
    this.getReward();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  goToProfile() {
    this.app.getRootNav().push('ProfilePage');
  }

  getReward(){
    this.reward.getRewardService().then((res)=>{
      this.rewardData = res;
      console.log(this.rewardData);
    })
  }


}
