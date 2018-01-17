import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the GridShopYComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'grid-shop-y',
  templateUrl: 'grid-shop-y.html'
})
export class GridShopYComponent {

  @Input() items: any;
  @Output() selectedItem: EventEmitter<any> = new EventEmitter<any>();

  constructor() {

  }

  selected(item){
    this.selectedItem.emit(item);
  }

}
