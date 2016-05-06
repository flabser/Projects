import {Component, Inject, OnInit} from '@angular/core';
import {Router, RouteSegment} from '@angular/router';
import {FORM_PROVIDERS, FormBuilder, Validators, ControlGroup, Control} from '@angular/common';

import {Task} from '../models/task';
import {TaskService} from '../services/task.service';
import {TaskFactory} from '../factories/task.factory';

@Component({
    selector: '[task]',
    template: require('../templates/task.html')
})

export class TaskComponent implements OnInit {
    loading: Boolean = true;
    task: Task = new Task();
    taskForm: ControlGroup;
    body: Control;

    constructor(
        private _router: Router,
        private _routeSegment: RouteSegment,
        private _formBuilder: FormBuilder,
        private _taskService: TaskService
    ) {
        this.body = new Control('');

        this.taskForm = _formBuilder.group({
            body: this.body
        });

        if (this._routeSegment.getParam('id') !== 'new') {
            this._taskService.getTaskById(this._routeSegment.getParam('id')).subscribe(
                task => {
                    this.task = task;
                    this.loading = false;
                },
                err => {
                    console.log(err);
                }
            );
        } else {
            this.loading = false;
        }
    }

    ngOnInit() {

    }

    saveTask() {
        this._taskService.saveTask(this.task).subscribe(resp => this.close());;
    }

    close() {
        this._router.navigate(['/tasks']);
    }
}
