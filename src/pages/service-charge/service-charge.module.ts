import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceChargePage } from './service-charge';

@NgModule({
  declarations: [
    ServiceChargePage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceChargePage),
  ],
})
export class ServiceChargePageModule {}
