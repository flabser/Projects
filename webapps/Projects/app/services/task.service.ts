import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { TranslateService } from 'ng2-translate/ng2-translate';

import { ReferenceService } from './reference.service';
import { Project, Task, TaskType, Tag, User, Attachment } from '../models';
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
        private translate: TranslateService,
        private referenceService: ReferenceService
    ) { }

    getTaskPriorityType() {
        return this.translate.get(['heighest', 'height', 'medium', 'normal']).map(t => [
            { value: 'HEIGHEST', text: t.heighest },
            { value: 'HEIGHT', text: t.height },
            { value: 'MEDIUM', text: t.medium },
            { value: 'NORMAL', text: t.normal, default: true }
        ]);
    }

    getTaskStatusType() {
        return this.translate.get(['draft', 'waiting', 'processed', 'finished']).map(t => [
            { value: 'DRAFT', text: t.draft, default: true },
            { value: 'WAITING', text: t.waiting },
            { value: 'PROCESSED', text: t.processed },
            { value: 'FINISHED', text: t.finished }
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
        if (taskId === 'new') {
            return Observable.of(<Task>this.makeTask({}));
        }

        return this.http.get(FORM_URL + '&docid=' + taskId, HEADER)
            .map(response => <Task>this.makeTask(response.json().objects[1]));
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

    private makeTask(json: any): Task {
        let task: Task = new Task();

        task.id = json.id;
        task.regDate = json.regDate;
        task.wasRead = json.wasRead;

        if (json.projectId) {
            task.project = new Project();
            task.project.id = json.projectId;
        }

        if (json.parentTaskId) {
            task.parent = new Task();
            task.parent.id = json.parentTaskId;
        }

        task.children = [];

        if (json.taskTypeId) {
            task.taskType = new TaskType();
            task.taskType.id = json.taskTypeId;
        }

        task.status = json.status || 'DRAFT';
        task.priority = json.priority || 'NORMAL';
        task.body = json.body;

        if (json.assigneeUserId) {
            task.assignee = new User();
            task.assignee.id = json.assigneeUserId;
        }

        task.startDate = json.startDate;
        task.dueDate = json.dueDate;

        if (json.tagIds) {
            task.tags = json.tagIds.map(id => {
                let t = new Tag();
                t.id = id;
                return t;
            });
        }
        task.attachments = [];


        // "projectId",
        // "childrenTaskIds",
        // "status",
        // "priority",
        // "body",
        // "attachments",
        // "customerObservation",
        // "tagIds",
        // "taskTypeId",
        // "url",
        // "assigneeUserId",

        return task;
    }

    //
    private serializeTask(task: Task): string {
        return serializeObj({
            projectId: task.project.id,
            taskTypeId: task.taskType.id || '',
            status: task.status,
            priority: task.priority,
            body: task.body,
            assigneeUserId: task.assignee.id,
            startDate: task.startDate,
            dueDate: task.dueDate,
            tagIds: Array.isArray(task.tags) ? task.tags.map(it => it.id).join(',') : '',
            fileIds: Array.isArray(task.attachments) ? task.attachments.join(',') : ''
        });
    }
}
