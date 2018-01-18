import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionModel } from '../../assets/model/questionanswer.model';
import { Constants } from '../../app/app.constants';

/*
  Generated class for the QuestionanswerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestionanswerProvider {
  API_URL: string = Constants.URL;

  constructor(public http: HttpClient) {
    console.log('Hello QuestionanswerProvider Provider');
  }
  getQuestion(): Promise<Array<QuestionModel>> {
    return this.http.get(this.API_URL + "/api/questions")
      .toPromise()
      .then(response => response as Array<QuestionModel>)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
