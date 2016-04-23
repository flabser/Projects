import {Component, HostBinding, HostListener, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {User} from '../models/user';
import {NavComponent} from './nav';
import {ProjectsComponent} from './projects';
import {ProjectComponent} from './project';
import {TasksComponent} from './tasks';
import {TaskComponent} from './task';
import {UserProfileComponent} from './user-profile';
import {UsersComponent} from './users';

@Component({
    selector: 'task-app',
    template: require('../templates/app.html'),
    directives: [ROUTER_DIRECTIVES, NavComponent]
})

@RouteConfig([
    { path: '/projects', name: 'Projects', component: ProjectsComponent },
    { path: '/projects/:id', name: 'Project', component: ProjectComponent },
    { path: '/tasks', name: 'Tasks', component: TasksComponent, useAsDefault: true },
    { path: '/tasks/:id', name: 'Task', component: TaskComponent },
    { path: '/profile', name: 'UserProfile', component: UserProfileComponent }
])

export class App implements OnInit {
    loggedUser: User;
    HEADER_TITLE: string = "Task";
    isNavCollapsed: Boolean;
    isMobileDevice: Boolean;
    layoutClass: string;

    @HostListener('window:resize', ['$event.target'])
        resize(window) { this.onResize(window); };
    @HostBinding('class.phone') get device() { return this.isMobileDevice; };
    @HostBinding('class.side-nav-toggle') get toggleNavVisible() { return this.isNavCollapsed; };

    constructor() {}

    ngOnInit() {
        this.isNavCollapsed = false;
        this.loggedUser = new User();
        this.isMobileDevice = this.isMobile();
    }

    toggleNav() {
        this.isNavCollapsed = !this.isNavCollapsed;
    }

    hideNav() {
        this.isNavCollapsed = false;
    }

    logout() {
        this.loggedUser = null;
    }

    goBack() {
        window.history.back();
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    onResize(window) {
        this.isMobileDevice = window.innerWidth <= 1024 || this.isMobile();
    }
}
