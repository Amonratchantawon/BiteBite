import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopPage } from './shop';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ShopPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopPage),
    TranslateModule.forChild(),
    ComponentsModule,
    PipesModule
  ],
})
export class ShopPageModule {}
