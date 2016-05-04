import {Component, Inject} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {Project} from '../models/project';
import {ProjectService} from '../services/project-service';
import {ProjectFactory} from '../factories/project-factory';

@Component({
    selector: '[projects]',
    template: require('../templates/projects.html'),
    directives: [ROUTER_DIRECTIVES]
})

export class ProjectsComponent {
    loading: Boolean = true;
    projects: Project[];

    constructor(
        private _router: Router,
        private projectService: ProjectService
    ) {
        projectService.getProjects()
            .subscribe(projects => {
                this.projects = projects;
                this.loading = false;
            });
    }

    composeRecord() {
        this._router.navigate(['Project', { id: 'new' }]);
    }

    deleteProject(project: Project) {
        this.projectService.deleteProject(project)
            .map(response => response)
            .subscribe();
    }
}
