import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouteSegment } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';

import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../shared/notification';
import { TextTransformPipe } from '../pipes/text-transform.pipe';
import { AppService } from '../services/app.service';
import { Task, TaskPriorityType, TaskStatusType } from '../models/task';
import { TaskService } from '../services/task.service';
import { ReferenceService } from '../services/reference.service';
import { Tag } from '../models/tag';
import { User } from '../models/user';

@Component({
    selector: '[task]',
    template: require('../templates/task.html'),
    directives: [FORM_DIRECTIVES],
    providers: [FormBuilder],
    pipes: [TranslatePipe, TextTransformPipe]
})

export class TaskComponent {
    task: Task;
    form: ControlGroup;
    users: User[];
    tags: Tag[];
    taskPriorityTypes = TaskPriorityType;
    taskStatusTypes = TaskStatusType;

    constructor(
        private router: Router,
        private routeSegment: RouteSegment,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private appService: AppService,
        private taskService: TaskService,
        private referenceService: ReferenceService,
        private notifyService: NotificationService
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
        let noty = this.notifyService.process(this.translate.get('wait_while_document_save')).show();
        this.taskService.saveTask(this.task).subscribe(
            response => {
                noty.set({ type: 'success', message: response.message }).remove(1500);
                this.close();
            },
            error => {
                noty.set({ type: 'error', message: error.message }).remove(1500);
                this.errorSaveTask(error);
            }
        );
    }

    errorSaveTask(errorResponse) {
        console.log(errorResponse);
    }

    close() {
        this.router.navigate(['/tasks']);
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }

    setStatus(value) {
        this.task.status = value;
    }

    setPriority(value) {
        this.task.priority = value;
    }
}
