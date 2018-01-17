import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterProfilePage } from './register-profile';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RegisterProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterProfilePage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class RegisterProfilePageModule {}
