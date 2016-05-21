import { Component, Inject } from '@angular/core';
import { Router, Routes, RouteSegment, RouteTree, OnActivate } from '@angular/router';

import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { TextTransformPipe, DateFormatPipe } from '../../pipes';

import { NotificationService } from '../../shared/notification';
import { PaginationComponent } from '../../shared/pagination';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { TaskRowComponent } from './task-row';
import { TaskComponent } from './task';

@Component({
    selector: 'tasks',
    template: require('./templates/tasks.html'),
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe],
    directives: [PaginationComponent, TaskRowComponent]
})

// @Routes([
//     { path: '/:id', component: TaskComponent },
// ])

export class TasksComponent {
    tasks: Task[];
    params: any = {};
    meta: any = {};
    requestProcess: boolean = true;

    constructor(
        private router: Router,
        private taskService: TaskService,
        private notifyService: NotificationService
    ) { }

    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) {
        this.params.for = curr.getParam('for');
        this.loadData(this.params);
    }

    loadData(params) {
        this.requestProcess = true;
        this.taskService.getTasks(params).subscribe(
            data => {
                this.tasks = data.tasks;
                this.meta = data.meta;
                this.requestProcess = false;
            },
            errorResponse => this.handleXhrError(errorResponse)
        );
    }

    goToPage(params) {
        this.loadData({
            page: params.page
        });
    }

    newTask() {
        this.router.navigate(['/task', 'new']);
    }

    deleteTask(task: Task) {
        this.taskService.deleteTask(task).subscribe();
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }
}
