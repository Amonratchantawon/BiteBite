import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoadingProvider {
  loading: any;
  constructor(public http: HttpClient, public loadingCtrl: LoadingController) {
  }

  onLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<div class="lds-css ng-scope">
      <div style="width:100%;height:100%" class="lds-eclipse">
        <img src="./assets/icon/loading/foods-icon.png" class="loading-img"/>
        <div></div>
      </div>`
    });
    this.loading.present();
    return;
  }

  dismiss() {
    this.loading.dismiss();
    return;
  }

  dismissAll() {
    this.loading.dismissAll();
    return;
  }

}
