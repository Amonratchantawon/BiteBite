import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPage } from './order';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrderPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderPage),    
    TranslateModule.forChild()
  ],
})
export class OrderPageModule {}
