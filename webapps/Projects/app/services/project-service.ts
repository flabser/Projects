import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Project} from '../models/project';
import {ProjectFactory} from '../factories/project-factory';
import {serializeObj} from '../utils/obj-utils';

const VIEW_URL = 'p?id=project-view';
const FORM_URL = 'p?id=project-form';
const HEADER = { headers: new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
}) };

@Injectable()
export class ProjectService {

    constructor(
        private http: Http
    ) {}

    getProjects() {
        return this.http.get(VIEW_URL, HEADER)
            .map(resp => ProjectFactory.createProjectList(resp.json().objects[0].list));
    }

    getProjectById(projectId: string) {
        return this.http.get(FORM_URL + '&docid=' + projectId, HEADER)
            .map(resp => ProjectFactory.createProject(resp.json().objects[1]));
    }

    saveProject(project: Project) {
        let url = FORM_URL + (project.id ? '&docid=' + project.id : '');
        return this.http.post(url, project.serialize(), HEADER);
    }

    deleteProject(project: Project) {
        return this.http.delete(VIEW_URL);
    }
}
