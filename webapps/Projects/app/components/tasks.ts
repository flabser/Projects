import {Component, Inject} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
// import {Observable} from 'rxjs/Observable';

import {Task} from '../models/task';
import {TaskService} from '../services/task-service';
import {TaskFactory} from '../factories/task-factory';

@Component({
    selector: '[tasks]',
    template: require('../templates/tasks.html'),
    directives: [ROUTER_DIRECTIVES]
})

export class TasksComponent {
    loading: Boolean = true;
    tasks: Task[];

    constructor(
        private _router: Router,
        private _params: RouteParams,
        private taskService: TaskService
    ) {
        taskService.getTasks(_params.get('at'))
            .subscribe(tasks => {
                this.tasks = tasks;
                this.loading = false;
            });
    }

    composeRecord() {
        this._router.navigate(['Task', { id: 'new' }]);
    }

    deleteTask(task: Task) {
        this.taskService.deleteTask(task)
            .map(response => response)
            .subscribe();
    }
}
