import { RewardModel } from '../../assets/model/reward.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the RewardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RewardProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RewardProvider Provider');
  }

  getRewardService(): Promise<RewardModel> {
    // return this.http.get(this.API_URL + '/api/customer/home/' + location.coords.latitude + '/ ' + location.coords.longitude)
      return this.http.get('./assets/json/reward.json')
      .toPromise()
      .then(response => response as RewardModel)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
