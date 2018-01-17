import { NgModule } from '@angular/core';
import { HighlightPipe } from './highlight/highlight';
import { FilterPipe } from './filter/filter';
import { SafePipe } from './safe/safe';
@NgModule({
	declarations: [HighlightPipe,
    FilterPipe,
    SafePipe],
	imports: [],
	exports: [HighlightPipe,
    FilterPipe,
    SafePipe]
})
export class PipesModule {}
