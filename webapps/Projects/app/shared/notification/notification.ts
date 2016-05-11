import { EventEmitter } from '@angular/core';

export class Notification {
    private emitter: EventEmitter<any> = new EventEmitter();

    private type: string;
    private message: string;
    private display = false;
    private delay;
    private to;
    private promise;

    constructor(type: string, message: string) {
        this.type = type;
        this.message = message;
    }

    public getEmitter() {
        return this.emitter;
    }

    show() {
        this.display = true;
        return this;
    }

    hide() {
        this.display = false;
        return this;
    }

    set(options) {
        for (var key in options) {
            if (key === 'message') {
                this.message = options[key];
            } else if (key === 'type') {
                this.type = options[key];
            }
        }
        return this;
    }

    private dismiss() {
        if (this.delay === 'click') {
            this.emitter.emit({ dismiss: true, notify: this, promise: this.promise });
        }
    }

    remove(delay: any) {
        this.delay = delay;
        clearTimeout(this.to);

        if (delay === 'click') {
            // resolve on dismiss
        } else if (delay > 0) {
            this.to = setTimeout(() => {
                this.emitter.emit({ dismiss: true, notify: this, promise: this.promise });
            }, delay);
        } else {
            this.emitter.emit({ dismiss: true, notify: this, promise: this.promise });
        }

        return this.promise;
    }
}
