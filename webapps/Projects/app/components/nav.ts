import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { AppService } from '../services/app.service';

@Component({
    selector: '[nav]',
    template: require('../templates/nav.html'),
    directives: [ROUTER_DIRECTIVES],
    pipes: [TranslatePipe]
})

export class NavComponent {
    constructor(
        private router: Router,
        private appService: AppService
    ) { }
}
