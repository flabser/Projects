import { Component, Inject } from '@angular/core';
import { Router, Routes, RouteSegment, RouteTree, OnActivate } from '@angular/router';

import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { TextTransformPipe, DateFormatPipe } from '../../pipes';

import { NotificationService } from '../../shared/notification';
import { PaginationComponent } from '../../shared/pagination';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { ProjectRowComponent } from './project-row';
import { ProjectComponent } from './project';

@Component({
    selector: 'projects',
    template: require('./templates/projects.html'),
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe],
    directives: [PaginationComponent, ProjectRowComponent]
})

@Routes([
    { path: '/:id', component: ProjectComponent }
])

export class ProjectsComponent {
    projects: Project[];
    params: any = {};
    meta: any = {};
    requestProcess: boolean = true;

    constructor(
        private router: Router,
        private projectService: ProjectService,
        private notifyService: NotificationService
    ) { }

    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) {
        this.loadData();
    }

    loadData(params?) {
        this.requestProcess = true;
        this.projectService.getProjects(params).subscribe(
            data => {
                this.projects = data.projects;
                this.meta = data.meta;
                this.requestProcess = false;
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
        // this.projectService.deleteProject(this.selectedProjects).subscribe();
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }
}
