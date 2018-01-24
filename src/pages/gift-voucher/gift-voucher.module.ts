import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiftVoucherPage } from './gift-voucher';

@NgModule({
  declarations: [
    GiftVoucherPage,
  ],
  imports: [
    IonicPageModule.forChild(GiftVoucherPage),
  ],
})
export class GiftVoucherPageModule {}
