import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'switch-button',
    template: `
        <label class="input" *ngFor="let item of items">
            <input type="{{isMulti ? 'checkbox' : 'radio'}}"
                name="{{name}}"
                value="{{item.value}}"
                [class.active]="item.value == model[value]"
                (change)="select(item.value, $event)"
                [checked]="item.value == model[value]" />
            <ng-content></ng-content>
            <i class="fa fa-{{item.icon}}" *ngIf="item.icon"></i>
            <span>{{item.text}}</span>
        </label>
    `
})

export class SwitchButtonComponent {
    @HostBinding('class.switch-button') true;

    @Input() model;
    @Input() value;
    @Input() items;
    @Input() name = 'swb' + Math.random();
    @Input() isMulti = false;

    select(value, event) {
        this.model[this.value] = value;
    }
}
