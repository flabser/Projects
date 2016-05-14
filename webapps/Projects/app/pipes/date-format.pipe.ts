import { Pipe } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'dateFmt' })
export class DateFormatPipe {
    transform(date: Date, format: string): string {
        if (!date) {
            return '';
        }

        if (!format) {
            format = 'DD.MM.YYYY';
        }

        let md = moment(date);

        if (md.isValid()) {
            return md.format(format);
        }

        return '';
    }
}
