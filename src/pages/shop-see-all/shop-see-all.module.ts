import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopSeeAllPage } from './shop-see-all';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ShopSeeAllPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopSeeAllPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class ShopSeeAllPageModule { }
