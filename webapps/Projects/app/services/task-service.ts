import {Injectable, Inject} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

import {Task} from '../models/task';
import {TaskFactory} from '../factories/task-factory';

const VIEW_URL = 'p?id=task-view';
const FORM_URL = 'p?id=task-form';
const HEADER = {
    headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Accept': 'application/json'
    })
};

@Injectable()
export class TaskService {

    constructor(
        private http: Http
    ) {}

    getTasks(at: string) {
        return this.http.get(VIEW_URL + (at ? '&at=' + at: ''), HEADER)
            .map(resp => TaskFactory.createTaskList(resp.json().objects[0].list));
    }

    getTaskById(projectId: string) {
        return this.http.get(FORM_URL + '&docid=' + projectId, HEADER)
            .map(response => TaskFactory.createTask(response.json().objects[1]));
    }

    saveTask(task: Task) {
        let url = FORM_URL + (task.id ? '&docid=' + task.id : '');
        return this.http.post(url, task.serialize(), HEADER);
    }

    deleteTask(task: Task) {
        return this.http.delete(VIEW_URL);
    }
}
