import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmedPage } from './confirmed';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ConfirmedPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmedPage),
    TranslateModule.forChild()
  ],
})
export class ConfirmedPageModule { }
