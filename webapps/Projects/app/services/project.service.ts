import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Project } from '../models/project';
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
        private http: Http
    ) { }

    getProjects() {
        return this.http.get(VIEW_URL, HEADER)
            .map(response => response.json().objects[0].list)
            .map((response: Project[]) => response);
    }

    getProjectById(projectId: string) {
        return this.http.get(FORM_URL + '&docid=' + projectId, HEADER)
            .map(response => response.json().objects[1])
            .map((response: Project) => response);
    }

    saveProject(project: Project) {
        let url = FORM_URL + (project.id ? '&docid=' + project.id : '');
        return this.http.post(url, this.serializeProject(project), HEADER);
    }

    deleteProject(projects: Project[]) {
        return this.http.delete(VIEW_URL);
    }

    //
    serializeProject(project: Project): string {
        return serializeObj({
            name: project.name,
            status: project.status,
            customer: project.customer || '',
            manager: project.manager || 0,
            programmer: project.programmer || 0,
            tester: project.tester || 0,
            observers: Array.isArray(project.observers) ? project.observers.join(',') : '',
            comment: project.comment,
            finish_date: project.finishDate ? project.finishDate.toString() : '',
            attachments: project.attachments ? project.attachments.map(it => it.id).join(',') : ''
        });
    }
}
