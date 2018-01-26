import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { SearchKeywordProvider } from './search-input.service';
import { LoadingProvider } from '../../providers/loading/loading';

/**
 * Generated class for the SearchInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search-input',
  templateUrl: 'search-input.html'
})
export class SearchInputComponent {
  searchText: string = '';

  constructor(
    public app: App,
    private search: SearchKeywordProvider,
    private loading: LoadingProvider
  ) {
  }

  getItems(e) {
    if (e.keyCode == 13) {
      let activeElement = <HTMLElement>document.activeElement;
      activeElement && activeElement.blur && activeElement.blur();
      if (this.searchText !== '') {
        this.loading.onLoading();
        this.search.searchKeyword(this.searchText).then((res) => {
          this.app.getRootNav().push('SearchResultPage', { keyword: this.searchText, items: res })
          this.searchText = '';
          this.loading.dismiss();
        }, (err) => {
          this.searchText = '';
          this.loading.dismiss();
        });
      }
    }
  }

}
