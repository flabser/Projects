import { Component, Inject } from '@angular/core';
import { Router, Routes, RouteSegment, RouteTree, OnActivate } from '@angular/router';

import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { DateFormatPipe } from '../pipes/date-format.pipe';

import { NotificationService } from '../shared/notification';
import { PaginationComponent } from '../shared/pagination/pagination';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
    selector: '[tasks]',
    template: require('../templates/tasks.html'),
    pipes: [DateFormatPipe, TranslatePipe],
    directives: [PaginationComponent],
    providers: [TaskService]
})

export class TasksComponent implements OnActivate {
    tasks: Task[];
    meta: any = {};
    params: any = {};

    constructor(
        private router: Router,
        private taskService: TaskService,
        private notifyService: NotificationService
    ) { }

    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) {
        this.params.for = curr.getParam('for');
        this.loadData(this.params);

        this.notifyService.info('tasks test notify').show().remove(300);
    }

    loadData(params) {
        this.taskService.getTasks(params).subscribe(
            data => {
                this.tasks = data.tasks;
                this.meta = data.meta;
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
