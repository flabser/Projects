import { Component, Inject } from '@angular/core';
import { Router, Routes, RouteSegment, RouteTree } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { TaskComponent } from '../components/task';

@Component({
    selector: '[tasks]',
    template: require('../templates/tasks.html'),
    pipes: [DatePipe]
})

export class TasksComponent {
    tasks: Task[];

    constructor(
        private router: Router,
        private routeSegment: RouteSegment,
        private taskService: TaskService
    ) {
        this.taskService.getTasks(this.routeSegment.getParam('for')).subscribe(
            tasks => this.tasks = tasks,
            errorResponse => this.handleXhrError(errorResponse)
        );
    }

    composeRecord() {
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
