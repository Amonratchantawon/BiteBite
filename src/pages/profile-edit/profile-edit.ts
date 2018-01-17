import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { AlertProvider } from '../../providers/alert/alert';
import { TranslateService } from '@ngx-translate/core';
import { AuthProvider } from '../../providers/auth/auth';
import { LoadingProvider } from '../../providers/loading/loading';
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
    public navParams: NavParams,
    private auth: AuthProvider,
    private loading: LoadingProvider,
    private translate: TranslateService,
    private alert: AlertProvider
  ) {
  }
  ionViewDidLoad() {
    this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
    if (this.user && this.user.gender) {
      this.user.gender = this.user.gender.toUpperCase();
    }
    console.log('ionViewDidLoad ProfileEditPage');
  }
  backButton(){
    this.navCtrl.push('ProfilePage');
  }

}
