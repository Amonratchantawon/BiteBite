import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { UserModel } from '../../assets/model/user.model';
import { AuthProvider } from '../../providers/auth/auth';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider
  ) {
  }

  ionViewDidLoad() {
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
  }

  updateProfile() {
    this.auth.updateUser(this.user).then((res) => {
      this.navCtrl.push('ProfilePage');
    });

  }

}
