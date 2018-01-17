import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MorePage } from './more';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MorePage,
  ],
  imports: [
    IonicPageModule.forChild(MorePage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class MorePageModule {}
