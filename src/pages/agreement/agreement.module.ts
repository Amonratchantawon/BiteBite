import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgreementPage } from './agreement';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AgreementPage,
  ],
  imports: [
    IonicPageModule.forChild(AgreementPage),
    TranslateModule.forChild(),
  ],
})
export class AgreementPageModule {}
