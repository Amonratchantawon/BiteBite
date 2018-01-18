import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiftCollectRandomPage } from './gift-collect-random';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    GiftCollectRandomPage,
  ],
  imports: [
    IonicPageModule.forChild(GiftCollectRandomPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class GiftCollectRandomPageModule {}
