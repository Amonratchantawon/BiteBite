import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactBitebitePage } from './contact-bitebite';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ContactBitebitePage,
  ],
  imports: [
    IonicPageModule.forChild(ContactBitebitePage),
    ComponentsModule
  ],
})
export class ContactBitebitePageModule {}
