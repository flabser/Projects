import {Component, Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {Observable} from 'rxjs/Observable';

import {Task} from '../models/task';
import {TaskService} from '../services/task-service';

@Component({
    selector: '[tasks]',
    template: require('../templates/tasks.html')
})

export class TasksComponent {
    tasks: Observable<Array<Task>>;

    constructor(
        @Inject('AppStore') private appStore,
        private _router: Router,
        private taskService: TaskService
    ) {
        this.tasks = taskService.tasks;
        taskService.getTasks();
    }

    composeRecord() {
        this._router.navigate(['Task', { id: 'new' }]);
    }

    deleteTask(task: Task) {
        
    }
}
