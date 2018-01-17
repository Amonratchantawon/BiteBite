import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterAccountPage } from './register-account';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RegisterAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterAccountPage),
    TranslateModule.forChild(),
  ],
})
export class RegisterAccountPageModule { }
