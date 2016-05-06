import {Component, Inject, OnInit} from '@angular/core';
import {Router, RouteSegment} from '@angular/router';
import {FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES} from '@angular/common';

import {Task} from '../models/task';
import {TaskService} from '../services/task.service';
import {TaskFactory} from '../factories/task.factory';

@Component({
    selector: '[task]',
    template: require('../templates/task.html'),
    directives: [FORM_DIRECTIVES],
    providers: [FormBuilder]
})

export class TaskComponent implements OnInit {
    task: Task;
    form: ControlGroup;

    constructor(
        private _router: Router,
        private _routeSegment: RouteSegment,
        private _formBuilder: FormBuilder,
        private _taskService: TaskService
    ) {
        this.form = _formBuilder.group({
            body: new Control('')
        });

        if (this._routeSegment.getParam('id') !== 'new') {
            this._taskService.getTaskById(this._routeSegment.getParam('id')).subscribe(
                task => {
                    this.task = task;
                },
                err => {
                    console.log(err);
                }
            );
        } else {
            this.task = new Task();
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
