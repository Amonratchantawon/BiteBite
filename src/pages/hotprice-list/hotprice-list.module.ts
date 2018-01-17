import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotpriceListPage } from './hotprice-list';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HotpriceListPage,
  ],
  imports: [
    IonicPageModule.forChild(HotpriceListPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class HotpriceListPageModule { }
