import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionAnswerPage } from './question-answer';

@NgModule({
  declarations: [
    QuestionAnswerPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionAnswerPage),
  ],
})
export class QuestionAnswerPageModule {}
