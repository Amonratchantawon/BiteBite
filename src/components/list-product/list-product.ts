import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the ListProductComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'list-product',
  templateUrl: 'list-product.html'
})
export class ListProductComponent {

  @Input('items') products: any;
  @Input() selectedCateId: string;
  @Output() clickItem: EventEmitter<any> = new EventEmitter<any>();
  constructor() {

  }

  click(item) {
    this.clickItem.emit(item);
  }

}
