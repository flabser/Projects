import {Component} from 'angular2/core';

import {User} from '../models/user';

@Component({
    selector: '[users]',
    template: require('../templates/users.html')
})

export class UsersComponent {
    users: User[];
}
