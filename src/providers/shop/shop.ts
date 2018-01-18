import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemShopModel, ShopModel, ItemShopModelMock } from '../../assets/model/shop.model';
import { Constants } from '../../app/app.constants';

/*
  Generated class for the ShopProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShopProvider {
  API_URL: string = Constants.URL;
  constructor(public http: HttpClient) {
  }

  getShopsByCondition(condition, location): Promise<Array<ItemShopModel>> {
    return this.http.get(this.API_URL + '/api/customer/shops/' + condition + '/' + location.coords.latitude + '/ ' + location.coords.longitude)
      .toPromise()
      .then(response => response as Array<ItemShopModel>)
      .catch(this.handleError);
  }

  getShopDetail(): Promise<ShopModel> {
    return this.http.get('./assets/json/shop.json')
      .toPromise()
      .then(response => response as ShopModel)
      .catch(this.handleError);
  }
  getShopsFavorite(): Promise<Array<ItemShopModelMock>> {
    return this.http.get('./assets/json/shoplist.json')
      .toPromise()
      .then(response => response as Array<ItemShopModelMock>)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // this.log.errorService('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
