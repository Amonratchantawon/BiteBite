import { ProductDetailModel } from '../../assets/model/product-detail.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ProductdetailProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {

  getProductDetail(): Promise<ProductDetailModel> {
    // return this.http.get(this.API_URL + '/api/customer/home')
    return this.http.get('./assets/json/productDetail.json')
      .toPromise()
      .then(response => response as ProductDetailModel)
      .catch(this.handleError);
  }

  getProductsByShop(): Promise<Array<ProductDetailModel>> {
    return this.http.get('./assets/json/product-list.json')
      .toPromise()
      .then(response => response as Array<ProductDetailModel>)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // this.log.errorService('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  constructor(public http: HttpClient) {
    console.log('Hello ProductdetailProvider Provider');
  }

}
