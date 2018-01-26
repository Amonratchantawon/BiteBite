import { ProductDetailModel } from '../../assets/model/product-detail.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Constants } from '../../app/app.constants';

/*
  Generated class for the ProductdetailProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {
  API_URL: string = Constants.URL;

  constructor(public http: HttpClient) {
    console.log('Hello ProductdetailProvider Provider');
  }

  getProductDetail(productId): Promise<ProductDetailModel> {
    return this.http.get(this.API_URL + '/api/customerproductdetail/' + productId)
      // return this.http.get('./assets/json/productDetail.json')
      .toPromise()
      .then(response => response as ProductDetailModel)
      .catch(this.handleError);
  }

  getProductsByShop(shopId): Promise<Array<ProductDetailModel>> {
    return this.http.get(this.API_URL + '/api/getproductlistbyshop/' + shopId)
      .toPromise()
      .then(response => response as Array<ProductDetailModel>)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // this.log.errorService('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
