import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';

import { Tabs } from '../shared/tabs/tabs';
import { Tab } from '../shared/tabs/tab';

import { AppService } from '../services/app.service';
import { User } from '../models/user';

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
        private router: Router,
        private formBuilder: FormBuilder,
        private appService: AppService
    ) {
        this.form = formBuilder.group({
            login: [],
            pwd: [],
            pwd_confirm: [],
            email: []
        });
    }

    updateUserProfile() {
        this.appService.updateUserProfile(this.user);
    }

    close(event) {
        event.preventDefault();
        window.history.back();
    }
}
