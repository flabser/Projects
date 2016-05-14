import { Directive, Input, HostBinding, HostListener, ElementRef, Renderer, AfterContentInit, OnDestroy } from '@angular/core';

@Directive({
    selector: '[dropdown]'
})

export class Dropdown {
    @HostBinding('class.dropdown') true;
    @HostBinding('class.open') get isOpen() { return this.open };

    @HostListener('mouseenter', ['$event']) public onMouseEnter($event: MouseEvent): void {
        clearTimeout(this.time);
        this.time = setTimeout(() => this.open = true, this.delay);
    }

    @HostListener('mouseleave', ['$event']) public onMouseLeave($event: MouseEvent): void {
        clearTimeout(this.time);
        this.time = setTimeout(() => this.open = false, this.delay);
    }

    @HostListener('click', ['$event']) public onClick($event: MouseEvent): void {
        this.selfClick = true;
    }

    @Input() open = false;
    private documentClickListener;
    private selfClick: boolean;
    private time;
    private delay = 500;

    constructor(private el: ElementRef, private renderer: Renderer) {
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            if (!this.selfClick) {
                this.open = false;
            } else {
                this.selfClick = false;
            }
        });
    }

    ngAfterContentInit() {
        this.renderer.listen(this.el.nativeElement.querySelector('[data-toggle=dropdown]'), 'click', (e) => this.toggleDropdown(e));
    }

    ngOnDestroy() {
        this.documentClickListener();
    }

    toggleDropdown(event) {
        this.open = !this.open;
        event.preventDefault();
    }
}
