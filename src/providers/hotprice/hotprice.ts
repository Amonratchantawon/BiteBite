import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemHotpricesModel } from '../../assets/model/hotprice.model';
import { AuthProvider } from '../auth/auth';
import { Constants } from '../../app/app.constants';

@Injectable()
export class HotpriceProvider {
  API_URL: string = Constants.URL;
  constructor(
    public http: HttpClient,
    private auth: AuthProvider
  ) {
  }

  getHotpriceData(): Promise<Array<ItemHotpricesModel>> {
    let header = this.auth.setHeader();
    return this.http.get(this.API_URL + '/api/hotprices', { headers: header })
      .toPromise()
      .then(response => response as Array<ItemHotpricesModel>)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
