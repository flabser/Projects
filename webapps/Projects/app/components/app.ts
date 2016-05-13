import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Router, Routes, RouteTree, ROUTER_DIRECTIVES } from '@angular/router';

import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { AppService } from '../services/app.service';
import { ReferenceService } from '../services/reference.service';
import { StaffService } from '../services/staff.service';

import { NotificationService, NotificationsComponent } from '../shared/notification';

import { NavComponent } from './nav';
import { ProjectsComponent } from './project/projects';
import { ProjectComponent } from './project/project';
import { TasksComponent } from './task/tasks';
import { TaskComponent } from './task/task';
import { UserProfileComponent } from './user-profile';
import { LoginComponent } from './login';
import { User } from '../models/user';

@Component({
    selector: 'project-app',
    template: require('../templates/app.html'),
    directives: [ROUTER_DIRECTIVES, NavComponent, NotificationsComponent],
    providers: [NotificationService],
    pipes: [TranslatePipe]
})

@Routes([
    { path: '/tasks/:for', component: TasksComponent },
    { path: '/tasks', component: TasksComponent },
    { path: '/task/:id', component: TaskComponent },
    { path: '/projects/:id', component: ProjectComponent },
    { path: '/projects', component: ProjectsComponent },
    { path: '/user-profile', component: UserProfileComponent },
    { path: '/login', component: LoginComponent }
])

export class App implements OnInit {
    loggedUser: User;
    HEADER_TITLE: any = "Projects";
    isNavCollapsed: Boolean;
    isSearchOpen: Boolean;
    isMobileDevice: Boolean;

    @HostListener('window:resize', ['$event.target']) resize(window) { this.onResize(window); };
    @HostBinding('class.phone') get device() { return this.isMobileDevice; };
    @HostBinding('class.side-nav-toggle') get toggleNavVisible() { return this.isNavCollapsed; };
    @HostBinding('class.search-open') get toggleSearch() { return this.isSearchOpen; };

    constructor(
        private router: Router,
        private appService: AppService,
        private referenceService: ReferenceService,
        private staffService: StaffService,
        public translate: TranslateService,
        public notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.isSearchOpen = false;
        this.isNavCollapsed = false;
        this.loggedUser = new User();
        this.isMobileDevice = this.isMobile();

        // ng2-translate
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('en');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(userLang);

        this.translate.get('brand').subscribe(value => this.HEADER_TITLE = value);
    }

    toggleNav() {
        this.isNavCollapsed = !this.isNavCollapsed;
    }

    hideNav(event) {
        event.preventDefault();
        this.isNavCollapsed = false;
        this.isSearchOpen = false;
    }

    searchToggle() {
        this.isSearchOpen = !this.isSearchOpen;
    }

    logout(event) {
        event.preventDefault();
        // this.loggedUser = null;
        window.location.href = 'Logout';
    }

    goBack() {
        window.history.back();
    }

    preventDefault(event) {
        event.preventDefault();
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    onResize(window) {
        this.isMobileDevice = window.innerWidth <= 1024 || this.isMobile();
    }
}
