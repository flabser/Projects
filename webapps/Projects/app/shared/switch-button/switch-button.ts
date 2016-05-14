import { Component, HostBinding, Input, AfterContentInit } from '@angular/core';

@Component({
    selector: 'switch-button',
    template: `
        <label class="input"
                [class.active]="isSelected(item)"
                [class.disabled]="disabled || item.disabled"
                *ngFor="let item of items">
            <input type="{{multi ? 'checkbox' : 'radio'}}"
                name="{{name}}"
                value="{{item.value}}"
                [checked]="isSelected(item)"
                [disabled]="disabled || item.disabled"
                (change)="select(item.value, $event)" />
            <i class="fa fa-{{item.icon}}" *ngIf="item.icon"></i>
            <span>{{item.text}}</span>
        </label>
    `
})

export class SwitchButtonComponent {
    @HostBinding('class.switch-button') true;

    @Input() model;
    @Input() value; // model field name
    @Input() items;
    @Input() name = 'swb' + Math.random();
    @Input() multi = false;
    @Input() disabled = false;

    private checkDefault = true;

    ngAfterContentInit() {
        [].concat(this.items).forEach(it => {
            if (this.checkDefault && it.value == this.model[this.value]) {
                this.checkDefault = false;
            }
        });
    }

    select(value, event) {
        this.model[this.value] = value;
    }

    isSelected(item) {
        return item.value == this.model[this.value] || (this.checkDefault && item.default);
    }
}
