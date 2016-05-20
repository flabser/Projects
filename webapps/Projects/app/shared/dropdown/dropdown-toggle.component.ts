import { Component, HostBinding, HostListener, EventEmitter } from '@angular/core';

@Component({
    selector: '[dropdown-toggle]',
    template: `<ng-content></ng-content>`
})

export class DropdownToggleComponent {
    public toggle: EventEmitter<any> = new EventEmitter<any>();

    @HostBinding('class.dropdown-toggle') true;

    @HostListener('click', ['$event']) public onClick($event: MouseEvent): void {
        this.toggle.emit($event);
    }
}
