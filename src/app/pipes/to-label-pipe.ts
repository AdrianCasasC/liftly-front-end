import { Pipe, PipeTransform } from '@angular/core';
import { DropdownItem } from '@app/models/common';

@Pipe({
  name: 'toLabel'
})
export class ToLabelPipe implements PipeTransform {

  transform(value: string | null | undefined, options: DropdownItem<string | null | undefined>[]): string {
    if (!value || !options || options.length === 0) return '';

    const match = options.find(opt => opt.value === value);
    return match ? match.label : value; // fallback to showing value if not found
  }

}
