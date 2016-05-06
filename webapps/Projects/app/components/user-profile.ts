import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FORM_PROVIDERS, FormBuilder, Validators, ControlGroup, Control} from '@angular/common';

import {Tabs} from './tabs/tabs';
import {Tab} from './tabs/tab';

import {User} from '../models/user';
import {UserFactory} from '../factories/user.factory';

@Component({
    selector: '[user-profile]',
    template: require('../templates/user-profile.html'),
    directives: [Tabs, Tab]
})

export class UserProfileComponent {
    user: User = new User();
    userForm: ControlGroup;

    login: Control;
    pwd: Control;
    pwd_confirm: Control;
    email: Control;

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder
    ) {
        this.login = new Control('');
        this.pwd = new Control('');
        this.pwd_confirm = new Control('');
        this.email = new Control('');

        this.userForm = _formBuilder.group({
            login: this.login,
            pwd: this.pwd,
            pwd_confirm: this.pwd_confirm,
            email: this.email
        });
    }

    close(event) {
        event.preventDefault();
        window.history.back();
    }
}
