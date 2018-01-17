import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressEditPage } from './address-edit';

@NgModule({
  declarations: [
    AddressEditPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressEditPage),
  ],
})
export class AddressEditPageModule {}
