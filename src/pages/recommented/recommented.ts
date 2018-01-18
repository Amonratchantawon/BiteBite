import { Component, ViewChild } from '@angular/core';
import { IonicPage, App, NavController, Content, ActionSheetController, Platform, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ReviewModel } from '../../assets/model/review.model';
import { ReviewProvider } from '../../providers/review/review';
import { AuthProvider } from '../../providers/auth/auth';
import { UserModel } from '../../assets/model/user.model';
import { LoadingProvider } from '../../providers/loading/loading';
import { Constants } from '../../app/app.constants';

@IonicPage()
@Component({
  selector: 'page-recommented',
  templateUrl: 'recommented.html',
})
export class RecommentedPage {
  @ViewChild(Content) content: Content;
  searchText: string = '';
  user: UserModel = new UserModel();
  dataReview: Array<ReviewModel>;
  dataReviewPaging: Array<any> = [];
  isInfinite: Boolean = false;
  constructor(
    public navCtrl: NavController,
    private reviewProvider: ReviewProvider,
    private auth: AuthProvider,
    private app: App,
    private actionSheetCtrl: ActionSheetController,
    private translate: TranslateService,
    private platform: Platform,
    private imagePicker: ImagePicker,
    private crop: Crop,
    private alertCtrl: AlertController,
    private camera: Camera,
    private loading: LoadingProvider
  ) {
  }

  ionViewWillEnter() {
    this.isInfinite = false;
    this.auth.authenticated().then((res) => {
      if (res) {
        this.user = JSON.parse(window.localStorage.getItem('user@' + Constants.URL));
        this.getReview();
      } else {
        this.user = null;
        this.dataReview = [];
        this.navCtrl.push('LoginPage');
      }
    });
  }

  getReview() {
    this.loading.onLoading();
    this.reviewProvider.getReviews().then(res => {
      // this.dataReview = res;
      this.doPaging(res);
      this.loading.dismiss();
    }).catch(err => {
      console.log(err);
      this.loading.dismiss();
    });
  }

  doRefresh(refresher) {
    this.getReview();
    refresher.complete();
  }

  goToProfile() {
    this.app.getRootNav().push('ProfilePage');
  }

  findShopReview() {
    this.app.getRootNav().push('FindShopReviewPage');
  }

  getMoment(date) {
    let language = this.translate.currentLang;
    if (language === 'th') {
      moment.locale('th');
    } else if (language === 'en') {
      moment.locale('en');
    }
    return moment(date).startOf('minute').fromNow();
  }

  isLike(item, i) {

    this.dataReview[i].islike = !this.dataReview[i].islike;
    if (this.dataReview[i].islike) {
      this.dataReview[i].countlike++;
    } else {
      this.dataReview[i].countlike--;
    }

    this.reviewProvider.like(item._id).then((res) => {
      this.dataReview[i].islike = res.islike;
      this.dataReview[i].countlike = res.countlike;
    });
  }

  doPaging(data) {

    this.content.scrollToTop();
    let maxLength = 10;
    this.dataReviewPaging = [];
    this.dataReview = [];
    if (maxLength > 0) {
      let pages = data.length / maxLength;
      let paper = 0;
      for (let i = 0; i < pages; i++) {
        this.dataReviewPaging.push(data.slice(paper, paper + maxLength));
        paper += maxLength;
      }

      this.dataReview = this.dataReviewPaging[0];
      this.dataReviewPaging.splice(0, 1);
    } else {
      this.dataReview = data;
    }
    setTimeout(() => {
      this.isInfinite = true;
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    if (this.isInfinite) {
      setTimeout(() => {
        if (this.dataReviewPaging.length > 0) {
          this.dataReview = this.dataReview.concat(this.dataReviewPaging[0]);
          this.dataReviewPaging.splice(0, 1);
        }
        infiniteScroll.complete();
      }, 500);
    } else {
      infiniteScroll.complete();
    }
  }

  // image

  goReview() {

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
          this.app.getRootNav().push('CreateReviewPage', { image: resizeImageData });
          // alert('ss');
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
        this.app.getRootNav().push('CreateReviewPage', { image: resizeImageData });
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
