import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceChargePage } from './service-charge';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ServiceChargePage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceChargePage),
    TranslateModule.forChild()
  ],
})
export class ServiceChargePageModule {}
