import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SettingDetailPage } from './setting-detail';
@NgModule({
  declarations: [
    SettingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingDetailPage),
    TranslateModule.forChild()
  ],
})
export class SettingDetailPageModule {}
