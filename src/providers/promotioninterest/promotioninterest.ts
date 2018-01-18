import { Constants } from '../../app/app.constants';
import { PromotionInterestModel } from '../../assets/model/promotioninterest.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the PromotioninterestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromotioninterestProvider {
  API_URL: string = Constants.URL;
  constructor(public http: HttpClient) {
    console.log('Hello PromotioninterestProvider Provider');
  }

  getPromotionInterest(): Promise<PromotionInterestModel> {
    return this.http.get(this.API_URL+'/api/promotioninterests')
      .toPromise()
      .then(response => response as PromotionInterestModel)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // this.log.errorService('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}
