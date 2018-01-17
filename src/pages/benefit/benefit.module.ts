import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BenefitPage } from './benefit';

@NgModule({
  declarations: [
    BenefitPage,
  ],
  imports: [
    IonicPageModule.forChild(BenefitPage),
  ],
})
export class BenefitPageModule {}
