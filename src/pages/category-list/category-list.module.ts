import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryListPage } from './category-list';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CategoryListPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryListPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class CategoryListPageModule {}
