import {Component, Inject, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {Task} from '../models/task';
import {TaskActions} from '../actions/task';

@Component({
    selector: '[task]',
    template: require('../templates/task.html')
})

export class TaskComponent implements OnInit {
    task: Task;

    constructor (
        @Inject('AppStore') private appStore,
        private taskActions: TaskActions,
        private _router: Router
    ) { }

    ngOnInit() {
        this.task = new Task();
    }

    onSubmit() {
        this.appStore.dispatch(this.taskActions.saveTask(this.task));
    }

    close() {
        this._router.navigate(['Tasks']);
    }
}
