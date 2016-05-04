import {Component, HostBinding, HostListener, OnInit} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {AppService} from '../services/app-service';
import {ReferenceService} from '../services/reference-service';
import {StaffService} from '../services/staff-service';

import {NavComponent} from './nav';
import {ProjectsComponent} from './projects';
import {ProjectComponent} from './project';
import {TasksComponent} from './tasks';
import {TaskComponent} from './task';
import {UserProfileComponent} from './user-profile';
import {LoginComponent} from './login';
import {UsersComponent} from './users';
import {User} from '../models/user';

@Component({
    selector: 'project-app',
    template: require('../templates/app.html'),
    directives: [ROUTER_DIRECTIVES, NavComponent]
})

@RouteConfig([
    { path: '/projects', name: 'Projects', component: ProjectsComponent },
    { path: '/projects/:id', name: 'Project', component: ProjectComponent },
    { path: '/tasks', name: 'Tasks', component: TasksComponent, useAsDefault: true },
    { path: '/tasks/:id', name: 'Task', component: TaskComponent },
    { path: '/profile', name: 'UserProfile', component: UserProfileComponent },
    { path: '/login', name: 'Login', component: LoginComponent }
])

export class App implements OnInit {
    loggedUser: User;
    HEADER_TITLE: string = "Projects";
    isNavCollapsed: Boolean;
    isMobileDevice: Boolean;
    layoutClass: string;

    @HostListener('window:resize', ['$event.target']) resize(window) { this.onResize(window); };
    @HostBinding('class.phone') get device() { return this.isMobileDevice; };
    @HostBinding('class.side-nav-toggle') get toggleNavVisible() { return this.isNavCollapsed; };

    constructor(
        private _router: Router,
        private appService: AppService,
        private referenceService: ReferenceService,
        private staffService: StaffService
    ) { }

    ngOnInit() {
        this.isNavCollapsed = false;
        this.loggedUser = new User();
        this.isMobileDevice = this.isMobile();

        this.appService.getTranslations()
            .subscribe(
                captions => console.log(captions),
                err => this._router.navigate(['Login'])
            );
    }

    toggleNav() {
        this.isNavCollapsed = !this.isNavCollapsed;
    }

    hideNav() {
        this.isNavCollapsed = false;
    }

    logout(event) {
        event.preventDefault();
        this.loggedUser = null;
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
