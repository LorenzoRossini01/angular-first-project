import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  standalone: true
})
export class ReversePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    return value.split('').reverse().join('') || 'No input provided'  // return 'No input provided' if no input provided;
  }

}
