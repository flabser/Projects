import {Component, Inject} from '@angular/core';
import {Router, Routes, RouteSegment, RouteTree} from '@angular/router';

import {Task} from '../models/task';
import {TaskService} from '../services/task-service';
import {TaskFactory} from '../factories/task-factory';
import {TaskComponent} from '../components/task';

@Component({
    selector: '[tasks]',
    template: require('../templates/tasks.html')
})

export class TasksComponent {
    tasks: Task[];

    constructor(
        private _router: Router,
        private _params: RouteSegment,
        private taskService: TaskService
    ) {
        taskService.getTasks(_params.getParam('at'))
            .subscribe(tasks => this.tasks = tasks);
    }

    composeRecord() {
        this._router.navigate(['/task', 'new']);
    }

    deleteTask(task: Task) {
        this.taskService.deleteTask(task)
            .map(response => response)
            .subscribe();
    }
}
