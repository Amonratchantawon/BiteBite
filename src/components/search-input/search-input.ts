import { Component } from '@angular/core';

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

  constructor() {
  }

  getItems(e) {
    if (e.keyCode == 13) {
      let activeElement = <HTMLElement>document.activeElement;
      activeElement && activeElement.blur && activeElement.blur();
      if (this.searchText !== '') {
        console.log('Search ' + this.searchText);
        this.searchText = '';
      }
    }
  }

}
