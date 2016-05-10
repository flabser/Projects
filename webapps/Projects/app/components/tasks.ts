import { Component, Inject } from '@angular/core';
import { Router, Routes, RouteSegment, RouteTree, OnActivate } from '@angular/router';
import { DatePipe } from '@angular/common';

import { PaginationComponent } from '../shared/pagination/pagination';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { TaskComponent } from '../components/task';

@Component({
    selector: '[tasks]',
    template: require('../templates/tasks.html'),
    pipes: [DatePipe],
    directives: [PaginationComponent],
    providers: [TaskService]
})

export class TasksComponent implements OnActivate {
    tasks: Task[];
    meta: any = {};
    params: any = {};

    constructor(
        private router: Router,
        private taskService: TaskService
    ) { }

    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) {
        this.params.for = curr.getParam('for');
        this.loadData(this.params);
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
