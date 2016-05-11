import { Component, EventEmitter, OnInit, HostBinding } from '@angular/core';

import { NotificationService } from './notification.service';
import { Notification } from './notification';

@Component({
    selector: 'notifications',
    template: `
        <div class="nb-notify-entry-{{notify.type}}"
                [class.dismiss-click]="notify.delay == 'click'"
                [style.display]="notify.display ? 'block': 'none'"
                (click)="notify.dismiss()"
                *ngFor="let notify of notifications">
            {{notify.message}}
        </div>
    `
})

export class NotificationsComponent implements OnInit {
    @HostBinding('class') className = 'nb-notify';

    public notifications: Notification[] = [];
    private listener: any;

    constructor(private notifyService: NotificationService) { }

    ngOnInit() {
        this.listener = this.notifyService.getEmitter().subscribe(item => {
            switch (item.command) {
                case 'cleanAll':
                    this.notifications = [];
                    break;

                case 'add':
                    this.addNotify(item.notify);
                    break;

                default:
                    break;
            }
        });
    }

    ngOnDestroy() {
        if (this.listener) {
            this.notifications.map(it => it.getEmitter().unsubscribe());
            this.listener.unsubscribe();
        }
    }

    addNotify(notify: Notification) {
        this.notifications.push(notify);
        notify.getEmitter().subscribe(item => this.notifyEmitter(item));
    }

    notifyEmitter(data) {
        if (data.dismiss) {
            let index = this.notifications.indexOf(data.notify);
            this.notifications.splice(index, 1);
            data.notify.getEmitter().unsubscribe();
        }
    }
}
