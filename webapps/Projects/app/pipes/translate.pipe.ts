import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 't' })
export class TranslatePipe implements PipeTransform {
    transform(value: string): string {
        return '';
    }
}
