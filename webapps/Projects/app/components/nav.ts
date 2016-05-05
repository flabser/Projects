import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

import {AppService} from '../services/app-service';

@Component({
    selector: '[nav]',
    template: require('../templates/nav.html'),
    directives: [ROUTER_DIRECTIVES]
})

export class NavComponent {
    constructor(
        private _appService: AppService,
        private _router: Router
    ) { }
}
