import {Component, Inject} from '@angular/core';
import {Router, Routes, RouteSegment, RouteTree, OnActivate} from '@angular/router';

import {Task} from '../models/task';
import {TaskService} from '../services/task.service';
import {TaskFactory} from '../factories/task.factory';
import {TaskComponent} from '../components/task';

@Component({
    selector: '[tasks]',
    template: require('../templates/tasks.html')
})

export class TasksComponent implements OnActivate {
    tasks: Task[];

    constructor(
        private _router: Router,
        private _routeSegment: RouteSegment,
        private _taskService: TaskService
    ) { }

    routerOnActivate(current: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) {
        // const id = +currTree.parent(current).getParam('id');

        this._taskService.getTasks(this._routeSegment.getParam('at')).subscribe(
            tasks => this.tasks = tasks,
            errorResponse => {
                if (errorResponse.status === 401) {
                    this._router.navigate(['/login']);
                }
            }
        );
    }

    composeRecord() {
        this._router.navigate(['/task', 'new']);
    }

    deleteTask(task: Task) {
        this._taskService.deleteTask(task).subscribe();
    }
}
