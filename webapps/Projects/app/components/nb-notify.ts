import { Component, ContentChildren, QueryList } from '@angular/core';

class _Noty {
    type = '';
    message = '';
    visible = false;

    constructor(type: string, message: string, visible: boolean) {
        this.type = type;
        this.message = message;
        this.visible = visible;
    }
}

@Component({
    selector: 'nb-notify',
    template: `
        <div class="nb-notify" *ngIf="notifyList">
            <div class="nb-notify-entry-{{notify.type}}" style="display:block;" *ngFor="let notify of notifyList">{{notify.message}}</div>
        </div>
    `
})
export class NBNotifyComponent {
    notifyList: _Noty[] = [];

    constructor() {
        // this.notifyList.push(new _Noty('info', 'hello', true));
    }
}
