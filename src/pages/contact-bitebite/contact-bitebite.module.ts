import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactBitebitePage } from './contact-bitebite';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ContactBitebitePage,
  ],
  imports: [
    IonicPageModule.forChild(ContactBitebitePage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class ContactBitebitePageModule {}
