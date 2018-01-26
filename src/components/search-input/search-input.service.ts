import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Constants } from '../../app/app.constants';
/*
  Generated class for the HomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchKeywordProvider {
    API_URL: string = Constants.URL;
    constructor(public http: HttpClient) {
    }

    searchKeyword(keyword): Promise<any> {
        let key = {
            keywordname: keyword
        };
        return this.http.post(this.API_URL + '/api/searchkeyword', key)
            // return this.http.get('./assets/json/home.json')
            .toPromise()
            .then(response => response as any)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        // this.log.errorService('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
