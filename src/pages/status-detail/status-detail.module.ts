import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatusDetailPage } from './status-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    StatusDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StatusDetailPage),
    TranslateModule.forChild()
  ],
})
export class StatusDetailPageModule {}
