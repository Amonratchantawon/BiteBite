import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { contactModel, titleModel } from '../../assets/model/contactbitebite.model';
import { Constants } from '../../app/app.constants';

/*
  Generated class for the ContactbitebiteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactbitebiteProvider {
  API_URL: string = Constants.URL;

  constructor(public http: HttpClient) {
    console.log('Hello ContactbitebiteProvider Provider');
  }
  setHeader() {
    let header = new HttpHeaders()
    header = header.append('Content-Type', 'application/json');
    header = header.append('Accept', 'application/json');
    header = header.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'));
    return header;
  }

  getContactChoices(): Promise<Array<titleModel>> {
    return this.http.get(this.API_URL + "/api/contactchoices")
      .toPromise()
      .then(response => response as Array<titleModel>)
      .catch(this.handleError);
  }

  createContactBiteBite(data): Promise<contactModel> {
    let header = this.setHeader();
    return this.http.post(this.API_URL + "/api/contactbitebites", data, { headers: header })
      .toPromise()
      .then(response => response as contactModel)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
