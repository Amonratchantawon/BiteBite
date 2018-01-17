import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatusPage } from './status';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    StatusPage,
  ],
  imports: [
    IonicPageModule.forChild(StatusPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class StatusPageModule {}
