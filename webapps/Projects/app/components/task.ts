import {Component, Inject, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {Task} from '../models/task';
import {TaskService} from '../services/task-service';

@Component({
    selector: '[task]',
    template: require('../templates/task.html')
})

export class TaskComponent implements OnInit {
    task: Task;

    constructor (
        private taskService: TaskService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.task = new Task();
    }

    onSubmit() {
        this.taskService.saveTask(this.task);
    }

    close() {
        this._router.navigate(['Tasks']);
    }
}
