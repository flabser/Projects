import { Pipe } from '@angular/core';

@Pipe({ name: 't' })
export class TranslatePipe {
    transform(value: string): string {
        return '';
    }
}
