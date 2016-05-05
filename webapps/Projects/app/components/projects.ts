import {Component, Inject} from '@angular/core';
import {Router, Routes} from '@angular/router';

import {Project} from '../models/project';
import {ProjectService} from '../services/project-service';
import {ProjectFactory} from '../factories/project-factory';
import {ProjectComponent} from '../components/project';

@Component({
    selector: '[projects]',
    template: require('../templates/projects.html')
})

@Routes([
    { path: '/:id', component: ProjectComponent }
])

export class ProjectsComponent {
    projects: Project[];

    constructor(
        private _router: Router,
        private projectService: ProjectService
    ) {
        projectService.getProjects()
            .subscribe(projects => this.projects = projects);
    }

    composeRecord() {
        this._router.navigate(['/project', 'new']);
    }

    deleteProject(project: Project) {
        this.projectService.deleteProject(project)
            .map(response => response)
            .subscribe();
    }
}
