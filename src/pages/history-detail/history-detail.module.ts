import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryDetailPage } from './history-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HistoryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoryDetailPage),
    TranslateModule.forChild()
  ],
})
export class HistoryDetailPageModule {}
