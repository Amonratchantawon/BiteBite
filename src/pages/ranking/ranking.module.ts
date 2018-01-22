import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RankingPage } from './ranking';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RankingPage,
  ],
  imports: [
    IonicPageModule.forChild(RankingPage),
    ComponentsModule
  ],
})
export class RankingPageModule {}
