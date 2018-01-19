import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoinBitebitePage } from './join-bitebite';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    JoinBitebitePage,
  ],
  imports: [
    IonicPageModule.forChild(JoinBitebitePage),
    TranslateModule.forChild(),
  ],
})
export class JoinBitebitePageModule {}
