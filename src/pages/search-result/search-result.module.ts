import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SearchResultPage } from './search-result';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    SearchResultPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchResultPage),
    TranslateModule.forChild(),
    ComponentsModule,
    Ionic2RatingModule,
    PipesModule
  ],
})
export class SearchResultPageModule {}
