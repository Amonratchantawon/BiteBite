import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromotioninterestPage } from './promotioninterest';

@NgModule({
  declarations: [
    PromotioninterestPage,
  ],
  imports: [
    IonicPageModule.forChild(PromotioninterestPage),
    TranslateModule.forChild(),
  ],
})
export class PromotioninterestPageModule {}
