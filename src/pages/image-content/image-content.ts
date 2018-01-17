import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
import { HomeProvider } from '../../providers/home/home';
import { TranslateService } from '@ngx-translate/core';
import { AlertProvider } from '../../providers/alert/alert';
import { ItemAdsModel } from '../../assets/model/home.model';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage()
@Component({
  selector: 'page-image-content',
  templateUrl: 'image-content.html',
})
export class ImageContentPage {
  adsDetail: ItemAdsModel = new ItemAdsModel();
  _id: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private home: HomeProvider,
    private translate: TranslateService,
    private alert: AlertProvider,
    private loading: LoadingProvider
  ) {
    this._id = this.navParams.get('_id');
  }

  ionViewWillEnter() {
    this.getAdsById(this._id);
  }

  getAdsById(_id) {
    this.loading.onLoading();
    this.home.getAdsById(_id).then((res) => {
      this.adsDetail = res;
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      let language = this.translate.currentLang;
      if (language === 'th') {
        this.alert.onAlert('แจ้งเตือน', 'โหลดข้อมูลผิดพลาด กรุณาลองอีกครั้ง', 'ตกลง');
      } else if (language === 'en') {
        this.alert.onAlert('Warning', 'Load data error.', 'OK');
      }
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  showPhoto(photo) {
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: [{
        url: photo,
        type: '.png',
      }]
    });
    modal.present();
  }

}
