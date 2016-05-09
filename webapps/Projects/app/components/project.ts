import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouteSegment } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';

import { AppService } from '../services/app.service';
import { Project, ProjectStatusType } from '../models/project';
import { ProjectService } from '../services/project.service';
import { StaffService } from '../services/staff.service';
import { Organization } from '../models/organization';
import { User } from '../models/user';

@Component({
    selector: '[project]',
    template: require('../templates/project.html'),
    directives: [FORM_DIRECTIVES],
    providers: [FormBuilder]
})

export class ProjectComponent {
    project: Project;
    form: ControlGroup;
    users: User[];
    customers: Organization[];
    statusOptions = ProjectStatusType;

    constructor(
        private router: Router,
        private routeSegment: RouteSegment,
        private formBuilder: FormBuilder,
        private appService: AppService,
        private projectService: ProjectService,
        private staffService: StaffService
    ) {
        this.form = formBuilder.group({
            name: ['', Validators.required],
            status: [''],
            customer: [''],
            manager: [''],
            programmer: [''],
            tester: [''],
            observers: [''],
            comment: [''],
            finishDate: [''],
            attachments: ['']
        });

        if (this.routeSegment.getParam('id') !== 'new') {
            this.projectService.getProjectById(this.routeSegment.getParam('id')).subscribe(
                project => this.project = project,
                errorResponse => this.handleXhrError(errorResponse)
            );
        } else {
            this.project = new Project();
        }

        staffService.getOrganizations().subscribe(orgs => this.customers = orgs);
        appService.getUsers().subscribe(users => this.users = users);
    }

    saveProject() {
        this.projectService.saveProject(this.project).subscribe(response => this.close());
    }

    close() {
        this.router.navigate(['/projects']);
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }
}
