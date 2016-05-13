import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { TranslateService } from 'ng2-translate/ng2-translate';

import { Task } from '../models/task';
import { serializeObj } from '../utils/obj-utils';

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
        private http: Http,
        private translate: TranslateService
    ) { }

    getTaskPriorityType() {
        return this.translate.get(['heighest']).map(t => [
            { value: 'HEIGHEST', text: this.translate.instant('heighest') },
            { value: 'HEIGHT', text: this.translate.instant('height') },
            { value: 'MEDIUM', text: this.translate.instant('medium') },
            { value: 'NORMAL', text: this.translate.instant('normal'), default: true }
        ]);
    }

    getTaskStatusType() {
        return this.translate.get(['draft']).map(t => [
            { value: 'DRAFT', text: this.translate.instant('draft'), default: true },
            { value: 'WAITING', text: this.translate.instant('waiting') },
            { value: 'PROCESSED', text: this.translate.instant('processed') },
            { value: 'FINISHED', text: this.translate.instant('finished') }
        ]);
    }

    getTasks(_params = {}) {
        let params: URLSearchParams = new URLSearchParams();
        for (let p in _params) {
            params.set(p, _params[p]);
        }

        return this.http.get(VIEW_URL, {
            headers: HEADER.headers,
            search: params
        })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    tasks: <Task[]>data.list,
                    meta: data.meta
                }
            });
    }

    getTaskById(taskId: string) {
        return this.http.get(FORM_URL + '&docid=' + taskId, HEADER)
            .map(response => <Task>response.json().objects[1]);
    }

    saveTask(task: Task) {
        let url = FORM_URL + (task.id ? '&docid=' + task.id : '');
        return this.http.post(url, this.serializeTask(task), HEADER)
            .map(response => this.transformPostResponse(response))
            .catch(error => Observable.throw(this.transformPostResponse(error)));
    }

    deleteTask(task: Task) {
        return this.http.delete(VIEW_URL);
    }

    private transformPostResponse(response: Response) {
        let json = response.json();
        return {
            ok: json.type === 'DOCUMENT_SAVED',
            message: json.captions ? json.captions.type : json.message,
            validation: json.validation,
            redirectURL: json.redirectURL,
            type: json.type
        };
    }

    //
    private serializeTask(task: Task): string {
        return serializeObj({
            type: task.type ? task.type.id : '',
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
