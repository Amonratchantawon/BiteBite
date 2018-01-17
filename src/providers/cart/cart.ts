import { CartModel } from '../../assets/model/cart.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {

  getCart(): Promise<CartModel> {
    return this.http.get('./assets/json/cart.json')
      .toPromise()
      .then(response => response as CartModel)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  constructor(public http: HttpClient) {
    console.log('Hello CartProvider Provider');
  }

}
