import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationDetailPage } from './notification-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NotificationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationDetailPage),
    TranslateModule.forChild()
  ],
})
export class NotificationDetailPageModule {}
