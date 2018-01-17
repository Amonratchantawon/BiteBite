import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(list: any[], obj: any): any[] {
    if (obj) {
      let key = Object.keys(obj);
      let val = obj[key[0]].toUpperCase();
      return list.filter(item => {
        return item[key[0]].toUpperCase().indexOf(val) !== -1
      });
    } else {
      return list;
    }
  }
}
