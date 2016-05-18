import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[home]',
    template: 'home'
})

export class HomeComponent {
    constructor(private router: Router) {
        router.navigate(['/tasks', 'all']);
    }
}
