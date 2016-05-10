import { Component, Input, Output, OnInit, HostBinding, EventEmitter } from '@angular/core';

@Component({
    selector: 'pagination',
    template: `
        <div class="pagination" *ngIf="totalPages > 1">
            <a href="#" *ngIf="startPage > 1" (click)="toPage($event, 1)">1</a>
            <span class="c1" *ngIf="startPage > 1">...</span>
            <a [class.page-active]="p == curPage" href="#" (click)="toPage($event, p)" *ngFor="let p of pages">{{p}}</a>
            <span class="c2" *ngIf="stopPage < totalPages">...</span>
            <a *ngIf="stopPage < totalPages" href="#" (click)="toPage($event, totalPages)">{{totalPages}}</a>
        </div>
    `
})

export class PaginationComponent implements OnInit {
    @HostBinding('class.hidden') get hidden() { return this.totalPages <= 0; };

    @Input('maxPageControl') maxPageControl: number = 5;
    @Input('totalPages') totalPages: number = 0;
    @Input('page') curPage: number = 1;

    @Output() goToPage = new EventEmitter<any>();

    private startPage: number = 1;
    private stopPage: number = 1;
    private pages: number[] = [];

    constructor() { }

    ngOnInit() {
        this.totalPages = +this.totalPages;
        console.log(this.totalPages);
        this.pagination();
    }

    toPage(event, page: number) {
        event.preventDefault();
        this.curPage = +page;
        this.goToPage.emit({ page: page });
        this.pagination();
    }

    pagination() {
        this.pages = [];

        if (+this.totalPages > 1) {
            this.maxPageControl = +this.maxPageControl;
            this.totalPages = +this.totalPages;
            this.curPage = +this.curPage;

            let perPage = Math.floor(this.maxPageControl / 2);
            this.startPage = (this.curPage - perPage);
            this.stopPage = (this.curPage + perPage);

            if (this.startPage <= perPage) {
                this.startPage = 1;
            } else if (this.curPage == this.totalPages) {
                this.startPage = this.totalPages - this.maxPageControl;
            }

            if (this.stopPage > (this.totalPages - perPage)) {
                this.stopPage = this.totalPages;
            } else if (this.curPage == 1) {
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
}
