import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardPage } from './reward';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RewardPage,
  ],
  imports: [
    IonicPageModule.forChild(RewardPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class RewardPageModule {}
