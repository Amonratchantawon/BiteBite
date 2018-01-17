import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HomeModel } from '../../assets/model/home.model';
import { Constants } from '../../app/app.constants';
/*
  Generated class for the HomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeProvider {
  API_URL: string = Constants.URL;
  constructor(public http: HttpClient) {
  }

  getHomeData(location): Promise<HomeModel> {
    return this.http.get(this.API_URL + '/api/customer/home/' + location.coords.latitude + '/ ' + location.coords.longitude)
      // return this.http.get('./assets/json/home.json')
      .toPromise()
      .then(response => response as HomeModel)
      .catch(this.handleError);
  }

  getAdsById(_id) {
    return this.http.get(this.API_URL + '/api/ads/' + _id)
      .toPromise()
      .then(response => response as HomeModel)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // this.log.errorService('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
