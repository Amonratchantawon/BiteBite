import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopinterestPage } from './shopinterest';

@NgModule({
  declarations: [
    ShopinterestPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopinterestPage),
    TranslateModule.forChild(),
  ],
})
export class ShopinterestPageModule {}
