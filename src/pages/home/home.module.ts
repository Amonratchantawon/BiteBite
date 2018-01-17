import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { Ionic2RatingModule } from 'ionic2-rating';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule.forChild(),
    Ionic2RatingModule,
    ComponentsModule
  ],
})
export class HomePageModule { }
