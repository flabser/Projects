import { Component, Input, Output, HostBinding, EventEmitter } from '@angular/core';

@Component({
    selector: 'pagination',
    template: `
        <div class="pagination" *ngIf="totalPages > 1">
            <a href="#" *ngIf="startPage > 1" (click)="toPage($event, 1)">1</a>
            <span *ngIf="startPage > 1">...</span>
            <a [class.page-active]="p == currentPage" href="#" *ngFor="let p of pages" (click)="toPage($event, p)">{{p}}</a>
            <span *ngIf="stopPage < totalPages">...</span>
            <a *ngIf="stopPage < totalPages" href="#" (click)="toPage($event, totalPages)">{{totalPages}}</a>
        </div>
    `
})

export class PaginationComponent {
    @HostBinding('hidden') get hostHidden() { return this.totalPages < 2; };

    @Input() maxPageControl: number = 5;
    @Input() totalPages: number = -1;
    @Input('page')
    set page(value: string) {
        this.currentPage = +value;

        if (this.initialized < 2) {
            ++this.initialized;
            this.pagination();
        }
    }

    @Output() onPageChange = new EventEmitter<any>();

    initialized: number = 0;
    currentPage: number = 0;
    startPage: number = 0;
    stopPage: number = 0;
    pages: number[] = [];

    constructor() { }

    toPage(event, page: number) {
        event.preventDefault();
        this.currentPage = +page;
        this.onPageChange.emit({ page: page });
        this.pagination();
    }

    pagination() {
        this.pages = [];

        if (this.totalPages <= 1) {
            return;
        }

        this.maxPageControl = +this.maxPageControl;
        this.totalPages = +this.totalPages;
        this.currentPage = +this.currentPage;

        let perPage = Math.floor(this.maxPageControl / 2);
        this.startPage = (this.currentPage - perPage);
        this.stopPage = (this.currentPage + perPage);

        if (this.startPage <= perPage) {
            this.startPage = 1;
        } else if (this.currentPage == this.totalPages) {
            this.startPage = this.totalPages - this.maxPageControl;
        }

        if (this.stopPage > (this.totalPages - perPage)) {
            this.stopPage = this.totalPages;
        } else if (this.currentPage == 1) {
            this.stopPage = this.maxPageControl + 1;
        }

        if ((this.maxPageControl + perPage) >= this.totalPages) {
            this.startPage = 1;
            this.stopPage = this.totalPages;
        }

        for (let p = this.startPage; p <= this.stopPage; p++) {
            this.pages.push(p);
        }
    }
}
