import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'switch-button',
    template: `
        <label class="input" *ngFor="let item of items">
            <input type="{{isMulti ? 'checkbox' : 'radio'}}"
                name="{{name}}"
                value="{{item.value}}"
                [class.active]="isSelected(item)"
                [checked]="isSelected(item)"
                (change)="select(item.value, $event)" />
            <i class="fa fa-{{item.icon}}" *ngIf="item.icon"></i>
            <span>{{item.text}}</span>
            <ng-content></ng-content>
        </label>
    `
})

export class SwitchButtonComponent {
    @HostBinding('class.switch-button') true;

    @Input() model;
    @Input() value; // model field name
    @Input() items;
    @Input() name = 'swb' + Math.random();
    @Input() isMulti = false;

    private checkDefault = true;

    select(value, event) {
        this.model[this.value] = value;

        if (this.checkDefault) {
            this.checkDefault = false;
        }
    }

    isSelected(item) {
        return item.value == this.model[this.value] || (this.checkDefault && item.default);
    }
}
