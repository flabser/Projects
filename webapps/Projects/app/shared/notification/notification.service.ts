import { Injectable, EventEmitter, Output } from '@angular/core';

import { Notification } from './notification';

@Injectable()
export class NotificationService {
    private emitter: EventEmitter<any> = new EventEmitter();

    public getEmitter() {
        return this.emitter;
    }

    info(message) {
        return this.add({ type: 'info', message: message });
    }

    success(message) {
        return this.add({ type: 'success', message: message });
    }

    error(message) {
        return this.add({ type: 'error', message: message });
    }

    process(message) {
        return this.add({ type: 'process', message: message });
    }

    add(options): Notification {
        let noty = new Notification(options.type, options.message);
        this.emitter.emit({ command: 'add', notify: noty });
        return noty;
    }

    removeAll() {
        this.emitter.emit({ command: 'cleanAll' });
    }
}
