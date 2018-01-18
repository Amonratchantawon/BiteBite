import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContactBitebitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-bitebite',
  templateUrl: 'contact-bitebite.html',
})
export class ContactBitebitePage {
  isUpload: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactBitebitePage');
  }
  uploadImage() {
    if (this.isUpload) {
      this.isUpload = false;
    } else {
      this.isUpload = true;
    }
  }
}
