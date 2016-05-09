import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouteSegment } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';

import { AppService } from '../services/app.service';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { ReferenceService } from '../services/reference.service';
import { Tag } from '../models/tag';
import { User } from '../models/user';

@Component({
    selector: '[task]',
    template: require('../templates/task.html'),
    directives: [FORM_DIRECTIVES],
    providers: [FormBuilder]
})

export class TaskComponent {
    task: Task;
    form: ControlGroup;
    users: User[];
    tags: Tag[];

    constructor(
        private router: Router,
        private routeSegment: RouteSegment,
        private formBuilder: FormBuilder,
        private appService: AppService,
        private taskService: TaskService,
        private referenceService: ReferenceService
    ) {
        this.form = formBuilder.group({
            type: [''],
            status: [''],
            priority: [''],
            body: ['', Validators.required],
            assignee: [''],
            startDate: [''],
            dueDate: [''],
            tags: [''],
            attachments: ['']
        });

        if (this.routeSegment.getParam('id') !== 'new') {
            this.taskService.getTaskById(this.routeSegment.getParam('id')).subscribe(
                task => this.task = task,
                errorResponse => this.handleXhrError(errorResponse)
            );
        } else {
            this.task = new Task();
        }

        this.appService.getUsers().subscribe(users => this.users = users);
        this.referenceService.getTags().subscribe(tags => this.tags = tags);
    }

    saveTask() {
        this.taskService.saveTask(this.task).subscribe(resp => this.close());
    }

    close() {
        this.router.navigate(['/tasks']);
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }
}
