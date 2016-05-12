import { Component, Inject } from '@angular/core';
import { Router, Routes, RouteSegment, RouteTree, OnActivate } from '@angular/router';

import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { DateFormatPipe } from '../pipes/date-format.pipe';

import { NotificationService } from '../shared/notification';
import { TextTransformPipe } from '../pipes/text-transform.pipe';
import { PaginationComponent } from '../shared/pagination/pagination';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';

@Component({
    selector: '[projects]',
    template: require('../templates/projects.html'),
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe],
    directives: [PaginationComponent]
})

export class ProjectsComponent implements OnActivate {
    projects: Project[];
    selectedProjects: Project[];
    params: any = {};
    meta: any = {};

    constructor(
        private router: Router,
        private projectService: ProjectService,
        private notifyService: NotificationService
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

    goToPage(params) {
        this.loadData({
            page: params.page
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
