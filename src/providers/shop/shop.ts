import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemShopModel, ShopModel } from '../../assets/model/shop.model';
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

  getShopDetail(shopId): Promise<ShopModel> {
    return this.http.get(this.API_URL + '/api/customershopdetail/' + shopId)
      .toPromise()
      .then(response => response as ShopModel)
      .catch(this.handleError);
  }

  checkShopsFavorite(shopId) {
    let favorite = window.localStorage.getItem('favorite_shop@' + Constants.URL) ? JSON.parse(window.localStorage.getItem('favorite_shop@' + Constants.URL)) : null;

    if (favorite) {
      let shop = favorite.filter((obj) => obj._id === shopId);
      if (shop && shop.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }

  onShopsFavorite(shop) {
    let favorite = window.localStorage.getItem('favorite_shop@' + Constants.URL) ? JSON.parse(window.localStorage.getItem('favorite_shop@' + Constants.URL)) : null;
    let res = false;
    if (favorite) {
      let shopItem = favorite.filter((obj) => obj._id === shop._id);
      if (shopItem && shopItem.length > 0) {
        favorite.splice(favorite.filter((obj, i) => {
          if (obj._id === shop._id) {
            return i;
          }
        }), 1);
        res = false;
      } else {
        shop.image = shop.coverimage;
        favorite.push(shop);
        res = true;
      }
    } else {
      shop.image = shop.coverimage;
      
      favorite = [shop];
      res = true;
    }
    window.localStorage.setItem('favorite_shop@' + Constants.URL, JSON.stringify(favorite));
    return res;
  }

  getShopsFavorite() {
    return window.localStorage.getItem('favorite_shop@' + Constants.URL) ? JSON.parse(window.localStorage.getItem('favorite_shop@' + Constants.URL)) : [];
  }

  private handleError(error: any): Promise<any> {
    // this.log.errorService('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
