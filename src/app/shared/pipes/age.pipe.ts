import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'age',
    standalone: false
})
export class AgePipe implements PipeTransform {
  transform(value: number): string {
    return value >= 18 ? 'Adult' : 'Minor';
  }
}