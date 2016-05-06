import {Component, Inject, OnInit} from '@angular/core';
import {Router, RouteSegment} from '@angular/router';
import {FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES} from '@angular/common';

import {AppService} from '../services/app.service';
import {Task} from '../models/task';
import {TaskService} from '../services/task.service';
import {TaskFactory} from '../factories/task.factory';
import {ReferenceService} from '../services/reference.service';
import {Tag} from '../models/tag';
import {User} from '../models/user';

@Component({
    selector: '[task]',
    template: require('../templates/task.html'),
    directives: [FORM_DIRECTIVES],
    providers: [FormBuilder]
})

export class TaskComponent implements OnInit {
    task: Task;
    form: ControlGroup;
    users: User[];
    tags: Tag[];

    constructor(
        private _router: Router,
        private _routeSegment: RouteSegment,
        private _formBuilder: FormBuilder,
        private _appService: AppService,
        private _taskService: TaskService,
        private _referenceService: ReferenceService
    ) {
        this.form = _formBuilder.group({
            type: new Control('', Validators.required),
            status: new Control(''),
            priority: new Control(''),
            body: new Control(''),
            assignee: new Control(''),
            startDate: new Control(''),
            dueDate: new Control(''),
            tags: new Control(''),
            attachments: new Control('')
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

        this._appService.getUsers().subscribe(users => this.users = users);
        this._referenceService.getTags().subscribe(tags => this.tags = tags);
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
