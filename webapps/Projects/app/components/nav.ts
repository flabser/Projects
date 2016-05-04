import {Component} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {AppService} from '../services/app-service';

@Component({
    selector: '[nav]',
    template: require('../templates/nav.html'),
    directives: [ROUTER_DIRECTIVES]
})

export class NavComponent {
    menus = [
        { title: 'Projects', url: 'Projects' },
        { title: 'Tasks', url: 'Tasks' }
    ];

    constructor(
        private appService: AppService
    ) {
        /*appService.getNav()
            .map(resp => resp.json())
            .subscribe(
                resp => {
                    console.log(resp);
                },
                err => err
            );*/
    }
}
