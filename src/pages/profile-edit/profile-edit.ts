import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { UserModel } from '../../assets/model/user.model';


/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {
  user: UserModel = new UserModel();

  inApp: Boolean = false;
  birthday: string;
  provider: string;
  isDisabled: boolean = false;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }
  ionViewDidLoad() {
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
  }
  updateProfile(){
    this.navCtrl.push('ProfilePage');
  }

}
