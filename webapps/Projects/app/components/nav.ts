import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

//import fetchNav from '../api/api';

@Component({
    selector: '[nav]',
    template: require('../templates/nav.html'),
    directives: [ROUTER_DIRECTIVES]
})

export class NavComponent implements OnInit {
    menus = [
        { title: 'Projects', url: 'Projects' },
        { title: 'Tasks', url: 'Tasks' }
    ];

    ngOnInit() {
        /*fetchNav().then((response) => {
            console.log(response);
        }, (response) => {
            console.log(response);
        });*/
    }
}
