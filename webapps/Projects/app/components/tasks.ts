import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {Task} from '../models/task';

@Component({
    selector: '[tasks]',
    template: require('../templates/tasks.html')
})

export class TasksComponent {
    tasks: Task[];

    constructor(private _router: Router) {}

    composeRecord() {
        this._router.navigate(['Task', { id: 'new' }]);
    }

    deleteTask(task: Task) {
        
    }
}
