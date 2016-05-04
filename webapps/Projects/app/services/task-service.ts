import {Injectable, Inject} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {Task} from '../models/task';

const VIEW_URL = 'p?id=task-view';
const FORM_URL = 'p?id=task-form';
const HEADER = { headers: new Headers({ 'Accept': 'application/json' }) };

@Injectable()
export class TaskService {

    constructor(
        private http: Http
    ) {}

    getTasks(at: string) {
        return this.http.get(VIEW_URL + '&at=' + at, HEADER);
    }

    saveTask(task: Task) {
        return this.http.post(FORM_URL, '', HEADER);
    }

    deleteTask(task: Task) {
        return this.http.delete(VIEW_URL);
    }
}
