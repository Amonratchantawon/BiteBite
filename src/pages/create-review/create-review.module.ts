import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateReviewPage } from './create-review';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CreateReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateReviewPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class CreateReviewPageModule { }
