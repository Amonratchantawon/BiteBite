import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageContentPage } from './image-content';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    ImageContentPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageContentPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class ImageContentPageModule { }
