import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES} from '@angular/common';

import {Tabs} from './tabs/tabs';
import {Tab} from './tabs/tab';

import {AppService} from '../services/app.service';
import {User} from '../models/user';

@Component({
    selector: '[user-profile]',
    template: require('../templates/user-profile.html'),
    directives: [FORM_DIRECTIVES, Tabs, Tab],
    providers: [FormBuilder]
})

export class UserProfileComponent {
    user: User = new User();
    form: ControlGroup;

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _appService: AppService
    ) {
        this.form = _formBuilder.group({
            login: new Control(''),
            pwd: new Control(''),
            pwd_confirm: new Control(''),
            email: new Control('')
        });
    }

    updateUserProfile() {
        this._appService.updateUserProfile(this.user);
    }

    close(event) {
        event.preventDefault();
        window.history.back();
    }
}
