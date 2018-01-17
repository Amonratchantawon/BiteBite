import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecommentedPage } from './recommented';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RecommentedPage,
  ],
  imports: [
    IonicPageModule.forChild(RecommentedPage),
    TranslateModule.forChild(),
    ComponentsModule,
    PipesModule
  ],
})
export class RecommentedPageModule { }
