import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindShopReviewPage } from './find-shop-review';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FindShopReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(FindShopReviewPage), 
    TranslateModule.forChild(),
    ComponentsModule,
  ],
})
export class FindShopReviewPageModule { }
