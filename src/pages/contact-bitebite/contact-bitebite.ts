import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactbitebiteProvider } from '../../providers/contactbitebite/contactbitebite';
import { titleModel, contactModel } from '../../assets/model/contactbitebite.model';
import { LoadingProvider } from '../../providers/loading/loading';

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
  choices: Array<titleModel>;
  contact: contactModel = new contactModel();
  selectChoices: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public contactService: ContactbitebiteProvider,
    private loading: LoadingProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactBitebitePage');
    this.getChoices();
  }
  getChoices() {
    this.loading.onLoading();
    this.contactService.getContactChoices().then((data) => {
      this.choices = data;
      if (data && data.length > 0) {
        this.selectChoices = data[0]._id
      }
      console.log(data);
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    });
  }

  sentContact() {
    let type = '';
    this.choices.forEach((data) => {
      if (data._id === this.selectChoices) {
        type = data.name;
      }
    });
    this.contact.title = this.selectChoices;
    this.loading.onLoading();    
    this.contactService.createContactBiteBite(this.contact).then((data) => {
      this.loading.dismiss();      
      alert(type + ' ของคุณถูกส่งเรียบร้อยแล้ว.');
      this.navCtrl.pop();
    }, (err) => {
      this.loading.dismiss();      
      console.log(err);
    });
  }
}
