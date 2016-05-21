import { Component } from '@angular/core';

@Component({
    selector: '[login]',
    template: ''
})

export class LoginComponent {
    constructor() {
        window.location.href = 'Logout';
    }
}
