import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PreloadImageComponent } from './preload-image/preload-image';
import { IonicModule } from 'ionic-angular';
import { GridShopYComponent } from './grid-shop-y/grid-shop-y';
import { Ionic2RatingModule } from 'ionic2-rating';
import { SearchInputComponent } from './search-input/search-input';
@NgModule({
	declarations: [
		PreloadImageComponent,
		GridShopYComponent,
    SearchInputComponent
	],
	imports: [
		IonicModule,
		Ionic2RatingModule,
		TranslateModule.forChild(),
	],
	exports: [
		PreloadImageComponent,
		GridShopYComponent,
    SearchInputComponent
	]
})
export class ComponentsModule { }
