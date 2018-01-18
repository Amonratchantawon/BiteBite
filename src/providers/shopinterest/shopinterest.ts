import { AuthProvider } from '../auth/auth';
import { Constants } from '../../app/app.constants';
import { ShopInterestModel } from '../../assets/model/shopinterest.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ShopinterestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShopinterestProvider {
  API_URL: string = Constants.URL;
  constructor(public http: HttpClient, public auth: AuthProvider) {
    console.log('Hello ShopinterestProvider Provider');
  }

  getShopInterest(): Promise<ShopInterestModel> {
    return this.http.get(this.API_URL + '/api/shopinterests')
      .toPromise()
      .then(response => response as ShopInterestModel)
      .catch(this.handleError);
  }

  postUserinter(userinterest): Promise<any> {
    let header = this.auth.setHeader();
    return this.http.post(this.API_URL + '/api/userinterests', userinterest, { headers: header })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // this.log.errorService('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
