import { Component, Inject, Output } from '@angular/core';
import { Router, Routes, RouteSegment, RouteTree, OnActivate } from '@angular/router';

import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { DateFormatPipe } from '../pipes/date-format.pipe';

import { PaginationComponent } from '../shared/pagination/pagination';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';

@Component({
    selector: '[projects]',
    template: require('../templates/projects.html'),
    pipes: [DateFormatPipe, TranslatePipe],
    directives: [PaginationComponent],
    providers: [ProjectService],
})

export class ProjectsComponent implements OnActivate {
    projects: Project[];
    selectedProjects: Project[];
    params: any = {};
    meta: any = {};

    constructor(
        private router: Router,
        private projectService: ProjectService
    ) { }

    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) {
        this.loadData({});
    }

    loadData(params) {
        this.projectService.getProjects(params).subscribe(
            data => {
                this.projects = data.projects;
                this.meta = data.meta;
            },
            errorResponse => this.handleXhrError(errorResponse)
        );
    }

    goToPage(meta) {
        this.loadData({
            page: meta.page
        });
    }

    newProject() {
        this.router.navigate(['/projects', 'new']);
    }

    deleteProject() {
        this.projectService.deleteProject(this.selectedProjects).subscribe();
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }
}
