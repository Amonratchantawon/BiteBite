import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NavtabsPage } from './navtabs';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NavtabsPage,
  ],
  imports: [
    IonicPageModule.forChild(NavtabsPage),
    TranslateModule.forChild(),
  ]
})
export class NavtabsPageModule {}
