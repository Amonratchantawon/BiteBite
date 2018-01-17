import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, AlertController, App } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';

import { LoadingProvider } from '../../providers/loading/loading';
import { ReviewProvider } from '../../providers/review/review';
import { ItemShopModel } from '../../assets/model/shop.model';

/**
 * Generated class for the FindShopReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-shop-review',
  templateUrl: 'find-shop-review.html',
})
export class FindShopReviewPage {
  maxLengthTitle: number = 30;
  title: string = '';
  isReview: Boolean = false;
  shops: Array<ItemShopModel>
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private actionSheetCtrl: ActionSheetController,
    private translate: TranslateService,
    private platform: Platform,
    private imagePicker: ImagePicker,
    private crop: Crop,
    private alertCtrl: AlertController,
    private camera: Camera,
    private loading: LoadingProvider,
    private reviewProvider: ReviewProvider
  ) {
  }

  ionViewWillEnter() {
    this.loading.onLoading();
    this.reviewProvider.getShopNameReviews().then((res) => {
      this.loading.dismiss();
      this.shops = res;
    }, (err) => {
      this.loading.dismiss();
    });
  }

  getItems(e) {
    if (this.title.length > 30) {
      setTimeout(() => {
        this.title = this.title.substring(0, 30);
      }, 0);
    }

    let val = this.title;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      let data = this.shops.filter((item) => {
        return (item.name.toLowerCase() === val.toLowerCase());
      })
      if (data && data.length > 0) {
        this.isReview = false;
        return;
      }
      this.isReview = true;
      return;
    }
  }

  selectImageReview() {

    let btn1;
    let btn2;
    let language = this.translate.currentLang;
    if (language === 'th') {
      btn1 = 'อัลบั้มรูป';
      btn2 = 'กล้องถ่ายรูป';
    } else {
      btn1 = 'Gallery';
      btn2 = 'Camera';
    }

    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: btn1,
          handler: () => {
            if (this.platform.is('cordova')) {
              this.onImagePicker();
            }
          }
        },
        {
          text: btn2,
          handler: () => {
            if (this.platform.is('cordova')) {
              this.onCamera();
            }
          }
        }
      ]
    });

    actionSheet.present();
  }

  onImagePicker() {
    const options = {
      maximumImagesCount: 1,
      width: 900,
      quality: 70,
      outputType: 0
    };
    this.imagePicker.getPictures(options).then((results) => {
      if (results === 'OK') {
        results = [];
      }
      for (let i = 0; i < results.length; i++) {
        let fileUri = results[i];
        if (this.platform.is('android')) {
          fileUri = 'file://' + fileUri;
        }
        this.resizeImage(fileUri).then((resizeImageData) => {
          this.app.getRootNav().push('CreateReviewPage', { title: this.title, image: resizeImageData });
        }, (resizeImageError) => {

          let alert = this.alertCtrl.create({
            title: 'Resize image',
            subTitle: 'Resize image error',
            mode: 'ios',
            buttons: ['OK']
          });
          alert.present();

        });
      }
    });
  }

  onCamera() {
    const options: CameraOptions = {
      quality: 50,
      targetWidth: 900,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

      this.resizeImage(imageData).then((resizeImageData) => {
        this.app.getRootNav().push('CreateReviewPage', { title: this.title, image: resizeImageData });
      }, (resizeImageError) => {

        let alert = this.alertCtrl.create({
          title: 'Resize image',
          subTitle: 'Resize image error',
          mode: 'ios',
          buttons: ['OK']
        });
        alert.present();

      });

    }, (err) => {

    });
  }

  resizeImage(fileUri): Promise<any> {

    return new Promise((resolve, reject) => {
      this.crop.crop(fileUri, { quality: 100 }).then((cropData) => {
        this.uploadImage(cropData).then((uploadImageData) => {
          resolve(uploadImageData);
        }, (uploadImageError) => {
          reject(uploadImageError);
        });
      }, (cropError) => {
        reject(cropError);
      });
    });

  }

  uploadImage(imageString): Promise<any> {

    return new Promise((resolve, reject) => {

      this.loading.onLoading();

      const storageRef = firebase.storage().ref();
      const filename = Math.floor((Date.now() / 1000) + new Date().getUTCMilliseconds());
      let imageRef = storageRef.child(`images/${filename}.png`);
      let parseUpload: any;
      let metadata = {
        contentType: 'image/png',
      };

      let xhr = new XMLHttpRequest();
      xhr.open('GET', imageString, true);
      xhr.responseType = 'blob';
      xhr.onload = (e) => {
        let blob = new Blob([xhr.response], { type: 'image/png' });

        parseUpload = imageRef.put(blob, metadata);
        parseUpload.on('state_changed', (_snapshot) => {
          let progress = (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (_snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
          (_err) => {
            reject(_err);
            this.loading.dismiss();
          },
          (success) => {
            resolve(parseUpload.snapshot.downloadURL);
            this.loading.dismiss();
          });

      }

      xhr.send();

    });

  }

}
