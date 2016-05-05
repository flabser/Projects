import {Component} from '@angular/core';

import {User} from '../models/user';

@Component({
    selector: '[user-profile]',
    template: require('../templates/user-profile.html')
})

export class UserProfileComponent {
    user: User;

    close() {
        window.history.back();
    }
}
