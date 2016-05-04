import {Component, Inject, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {FORM_PROVIDERS, FormBuilder, Validators, ControlGroup, Control} from 'angular2/common';

import {Task} from '../models/task';
import {TaskService} from '../services/task-service';
import {TaskFactory} from '../factories/task-factory';

@Component({
    selector: '[task]',
    template: require('../templates/task.html')
})

export class TaskComponent implements OnInit {
    task: Task;
    taskForm: ControlGroup;
    body: Control;

    constructor (
        private _taskService: TaskService,
        private _router: Router,
        private _params: RouteParams,
        private _formBuilder: FormBuilder
    ) {
        this.body = new Control('');

        this.taskForm = _formBuilder.group({
            body: this.body
        });

        if (this._params.get('id') !== 'new') {
            this._taskService.getTaskById(this._params.get('id')).subscribe(task => {
                this.task = task;
            }, task => {
                this.task = TaskFactory.createTask(task.json().objects[1]);
            });

            this.task.id = this._params.get('id');
        }
    }

    ngOnInit() {
        this.task = new Task();
    }

    saveTask() {
        this._taskService.saveTask(this.task).subscribe(resp => this.close());;
    }

    close() {
        this._router.navigate(['Tasks']);
    }
}
