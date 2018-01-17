import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterGiftPage } from './register-gift';

@NgModule({
  declarations: [
    RegisterGiftPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterGiftPage),
  ],
})
export class RegisterGiftPageModule {}
