import { Component, Input, HostBinding, HostListener, Renderer, AfterContentInit, OnDestroy, ContentChildren, EventEmitter, QueryList } from '@angular/core';

import { DropdownToggleComponent } from './dropdown-toggle.component';

@Component({
    selector: '[dropdown]',
    template: `<ng-content></ng-content>`
})

export class DropdownComponent {
    @HostBinding('class.dropdown') true;
    @HostBinding('class.open') get isOpen() { return this.open };

    @HostListener('mouseenter', ['$event']) public onMouseEnter($event: MouseEvent): void {
        if (this.mouseEvent) {
            clearTimeout(this.time);
            this.time = setTimeout(() => this.open = true, this.delay);
        }
    }

    @HostListener('mouseleave', ['$event']) public onMouseLeave($event: MouseEvent): void {
        if (this.mouseEvent) {
            clearTimeout(this.time);
            this.time = setTimeout(() => this.open = false, this.delay);
        }
    }

    @HostListener('click', ['$event']) public onClick($event: MouseEvent): void {
        this.selfClick = true;
    }

    @ContentChildren(DropdownToggleComponent) toggleComponent: QueryList<DropdownToggleComponent>;
    @Input() open = false;
    @Input() mouseEvent = false;
    private documentClickListener;
    private documentKeyupListener;
    private selfClick: boolean = false;
    private time;
    private delay = 500;

    constructor(private renderer: Renderer) {
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            if (!this.selfClick) {
                this.open = false;
            } else {
                this.selfClick = false;
            }
        });

        this.documentKeyupListener = this.renderer.listenGlobal('body', 'keyup', (event) => {
            if (event.code === 'Escape') {
                this.open = false;
            }
        });
    }

    ngAfterContentInit() {
        this.toggleComponent.forEach(it => it.toggle.subscribe(event => {
            this.toggleDropdown(event);
        }));
    }

    ngOnDestroy() {
        this.documentClickListener();
    }

    toggleDropdown(event) {
        this.open = !this.open;
        event.preventDefault();
    }
}
