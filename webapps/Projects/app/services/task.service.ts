import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Task} from '../models/task';
import {serializeObj} from '../utils/obj-utils';

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
    ) { }

    getTasks(at: string) {
        return this.http.get(VIEW_URL + (at ? '&for=' + at : ''), HEADER)
            .map(response => response.json().objects[0].list)
            .map((response: Task[]) => response);
    }

    getTaskById(taskId: string) {
        return this.http.get(FORM_URL + '&docid=' + taskId, HEADER)
            .map(response => response.json().objects[1])
            .map((response: Task) => response);
    }

    saveTask(task: Task) {
        let url = FORM_URL + (task.id ? '&docid=' + task.id : '');
        return this.http.post(url, this.serializeTask(task), HEADER);
    }

    deleteTask(task: Task) {
        return this.http.delete(VIEW_URL);
    }

    //
    serializeTask(task: Task): string {
        return serializeObj({
            type: task.type.id,
            status: task.status,
            priority: task.priority,
            body: task.body,
            assignee: task.assignee,
            start_date: task.startDate,
            due_date: task.dueDate,
            tags: Array.isArray(task.tags) ? task.tags.map(it => it.id).join(',') : task.tags,
            attachments: Array.isArray(task.attachments) ? task.attachments.map(it => it.id).join(',') : ''
        });
    }
}
