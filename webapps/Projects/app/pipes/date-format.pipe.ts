import {Pipe} from '@angular/core';

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe {
    transform(date: Date): string {
        if (date) {
          console.log(date.toString());
            return date.toString();
        }
        return '';
    }
}