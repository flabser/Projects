import { Pipe } from '@angular/core';

@Pipe({ name: 'text' })
export class TextTransformPipe {
    transform(text: string, transform: string): string {
        switch (transform) {
            case 'L':
                return text.toLowerCase();
            case 'U':
                return text.toUpperCase();
            default:
                return text;
        }
    }
}
