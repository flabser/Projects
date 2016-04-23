import {Component, Inject} from 'angular2/core';
import {Router} from 'angular2/router';
import {Observable} from 'rxjs/Observable';

import {Project} from '../models/project';
import {ProjectService} from '../services/project-service';

@Component({
    selector: '[projects]',
    template: require('../templates/projects.html')
})

export class ProjectsComponent {
    projects: Observable<Array<Project>>;

    constructor(
        @Inject('AppStore') private appStore,
        private _router: Router,
        private projectService: ProjectService
    ) {
        this.projects = projectService.projects;
        projectService.getProjects();
    }

    composeRecord() {
        this._router.navigate(['Project', { id: 'new' }]);
    }

    deleteProject(project: Project) {
        
    }
}
