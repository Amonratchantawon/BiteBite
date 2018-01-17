import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionanswerProvider } from '../../providers/questionanswer/questionanswer';
import { QuestionModel } from '../../assets/model/questionanswer.model';

/**
 * Generated class for the QuestionAnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-answer',
  templateUrl: 'question-answer.html',
})
export class QuestionAnswerPage {
  qas: Array<QuestionModel>;
  shownGroup = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public QAservice: QuestionanswerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionAnswerPage');
    this.getQA();
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };
  getQA() {
    this.QAservice.getQuestion().then((data) => {
      this.qas = data;
      console.log(data);
    }, (err) => {
      console.log(err);
    });
  }

}
