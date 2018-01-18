import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertProvider {

  constructor(
    public http: HttpClient,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {
  }

  // ### note ###
  // private translate: TranslateService,
  // let language = this.translate.currentLang;
  // if (language === 'th') {
  //   this.alert.onAlert('แจ้งเตือน', 'อีเมล์นี้มีผู้ใช้งานแล้ว', 'ตกลง');
  // } else if (language === 'en') {
  //   this.alert.onAlert('Wraning', 'Email is already exists.', 'OK');
  // }

  onAlert(title, massage, button) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: massage,
      mode: 'ios',
      buttons: [button],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  onDailyWelcomeAlert(image, title, description, remark, button) {
    let alert = this.alertCtrl.create({
      mode: 'ios',
      buttons: [button],
      enableBackdropDismiss: false
    });
    let message = '<img src="' + image + '"><h2>' + title + '</h2><h6>' + description + '</h6><p>' + remark + '</p>';
    alert.setMessage(message);
    alert.present();
  }

  onDailyWelcomeAlertGif(image, title, remark, cancelText, confirmText) {
    let alert = this.alertCtrl.create({
      mode: 'ios',
      buttons: [
        {
          text: cancelText,
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: confirmText,
          handler: () => {
            let gifModal = this.modalCtrl.create('GiftCollectRandomPage', {}, {
              enableBackdropDismiss: false
            });
            gifModal.present();
          }
        }
      ],
      enableBackdropDismiss: false
    });
    let message = '<img src="' + image + '"><h2>' + title + '</h2><p>' + remark + '</p>';
    alert.setMessage(message);
    alert.present();
  }

}
