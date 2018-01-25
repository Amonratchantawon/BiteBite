import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoogleMapsPage } from './google-maps';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    GoogleMapsPage,
  ],
  imports: [
    IonicPageModule.forChild(GoogleMapsPage),
    TranslateModule.forChild()
  ],
})
export class GoogleMapsPageModule { }
