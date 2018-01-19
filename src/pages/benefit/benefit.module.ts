import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BenefitPage } from './benefit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BenefitPage,
  ],
  imports: [
    IonicPageModule.forChild(BenefitPage),
    TranslateModule.forChild()
  ],
})
export class BenefitPageModule {}
