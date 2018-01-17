import { CategoryListModel } from '../../assets/model/category-list.model';
import { ItemCategoriyModel } from '../../assets/model/category-master.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Constants } from '../../app/app.constants';

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {
  API_URL: string = Constants.URL;
  constructor(
    public http: HttpClient,
  ) {
    console.log('Hello CategoryProvider Provider');
  }

  getCategory(): Promise<Array<ItemCategoriyModel>> {
    return this.http.get(this.API_URL + '/api/categoryshops')
      .toPromise()
      .then(response => response as Array<ItemCategoriyModel>)
      .catch(this.handleError);
  }

  getShopListByCategory(cateId, location): Promise<Array<CategoryListModel>> {
    return this.http.get(this.API_URL + '/api/customer/categoryshop/' + cateId + '/' + location.coords.latitude + '/ ' + location.coords.longitude)
      .toPromise()
      .then(response => response as Array<CategoryListModel>)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
