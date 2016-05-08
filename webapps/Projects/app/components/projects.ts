import {Component, Inject} from '@angular/core';
import {Router, Routes} from '@angular/router';
import {DatePipe} from '@angular/common';

import {Project} from '../models/project';
import {ProjectService} from '../services/project.service';
import {DateFormatPipe} from '../pipes/date-format.pipe';

@Component({
    selector: '[projects]',
    template: require('../templates/projects.html'),
    pipes: [DatePipe]
})

export class ProjectsComponent {
    projects: Project[];
    selectedProjects: Project[];

    constructor(
        private _router: Router,
        private projectService: ProjectService
    ) {
        projectService.getProjects().subscribe(
            projects => this.projects = projects,
            errorResponse => this.handleXhrError(errorResponse)
        );
    }

    composeRecord() {
        this._router.navigate(['/projects', 'new']);
    }

    deleteProject() {
        this.projectService.deleteProject(this.selectedProjects).subscribe();
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this._router.navigate(['/login']);
        }
    }
}
