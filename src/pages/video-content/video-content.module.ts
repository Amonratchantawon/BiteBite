import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoContentPage } from './video-content';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    VideoContentPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoContentPage),
    TranslateModule.forChild(),
    PipesModule
  ],
})
export class VideoContentPageModule {}
