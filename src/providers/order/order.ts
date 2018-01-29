import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../app/app.constants';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {
  API_URL: string = Constants.URL;
  constructor(
    public http: HttpClient,
    public auth: AuthProvider
  ) {

  }

  saveOrder(order) {
    let header = this.auth.setHeader();
    order.name = JSON.parse(window.localStorage.getItem('user@' + this.API_URL)).displayName;
    return this.http.post(this.API_URL + '/api/orders', order, { headers: header })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  payOrder(order) {
    let header = this.auth.setHeader();
    return this.http.put(this.API_URL + '/api/payorder/' + order._id, order, { headers: header })
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // this.log.errorService('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
