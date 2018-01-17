import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the HighlightPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search): string {
    var pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    pattern = pattern.split(' ').filter((t) => {
      return t.length > 0;
    }).join('|');
    var regex = new RegExp(pattern, 'gi');

    return search ? text.replace(regex, (match) => `<span class="highlight">${match}</span>`) : text;
  }
}
// <b innerHTML="{{ item.user.displayName | highlight:searchText}}"></b>
