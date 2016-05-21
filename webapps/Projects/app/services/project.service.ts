import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { TranslateService } from 'ng2-translate/ng2-translate';

import { Project, Task, TaskType, Tag, User, Attachment, Organization } from '../models';
import { serializeObj } from '../utils/obj-utils';

const VIEW_URL = 'p?id=project-view';
const FORM_URL = 'p?id=project-form';
const HEADER = {
    headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Accept': 'application/json'
    })
};

@Injectable()
export class ProjectService {

    constructor(
        private http: Http,
        private translate: TranslateService
    ) { }

    createURLSearchParams(_params): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();
        for (let p in _params) {
            params.set(encodeURIComponent(p), encodeURIComponent(_params[p]));
        }
        return params;
    }

    getProjectStatusTypes() {
        return this.translate.get(['draft', 'processed', 'finished']).map(t => [
            { value: 'DRAFT', text: t.draft, default: true },
            { value: 'PROCESSED', text: t.processed },
            { value: 'FINISHED', text: t.finished }
        ]);
    }

    getProjects(params = {}) {
        return this.http.get(VIEW_URL, {
            headers: HEADER.headers,
            search: this.createURLSearchParams(params)
        })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    projects: <Project[]>data.list,
                    meta: data.meta
                }
            });
    }

    getProjectById(projectId: string) {
        if (projectId === 'new') {
            return Observable.of(<Project>this.makeProject({}));
        }

        return this.http.get(FORM_URL + '&docid=' + projectId, HEADER)
            .map(response => <Project>this.makeProject(response.json().objects[1]));
    }

    saveProject(project: Project) {
        let url = FORM_URL + (project.id ? '&docid=' + project.id : '');
        return this.http.post(url, this.serializeProject(project), HEADER)
            .map(response => this.transformPostResponse(response))
            .catch(error => Observable.throw(this.transformPostResponse(error)));
    }

    deleteProject(projects: Project[]) {
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
    private makeProject(json): Project {
        let project = new Project();

        project.id = json.id;
        project.regDate = json.regDate;
        project.wasRead = json.wasRead;

        project.name = json.name;
        project.status = json.status;

        if (json.customerId) {
            project.customer = new Organization();
            project.customer.id = json.customerId;
        }
        if (json.managerUserId) {
            project.manager = new User();
            project.manager.id = json.managerUserId;
        }
        if (json.programmerUserId) {
            project.programmer = new User();
            project.programmer.id = json.programmerUserId;
        }
        if (json.testerUserId) {
            project.tester = new User();
            project.tester.id = json.testerUserId;
        }
        //project.observers = User[];
        project.comment = json.comment;
        project.finishDate = json.finishDate;
        //project.attachments = Attachment[];

        return project;
    }

    //
    private serializeProject(project: Project): string {
        return serializeObj({
            name: project.name,
            status: project.status,
            customerUserId: project.customer.id || '',
            managerUserId: project.manager.id || '',
            programmerUserId: project.programmer.id || '',
            testerUserId: project.tester.id || '',
            observerUserIds: Array.isArray(project.observers) ? project.observers.map(it => it.id).join(',') : project.observers,
            comment: project.comment,
            finishDate: project.finishDate ? project.finishDate.toString() : '',
            fileIds: project.attachments ? project.attachments.join(',') : ''
        });
    }
}
