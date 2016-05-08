import {Component, Inject, OnInit} from '@angular/core';
import {Router, RouteSegment} from '@angular/router';
import {FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES} from '@angular/common';

import {AppService} from '../services/app.service';
import {Project, ProjectStatusType} from '../models/project';
import {ProjectService} from '../services/project.service';
import {StaffService} from '../services/staff.service';
import {Organization} from '../models/organization';
import {User} from '../models/user';

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
        private _router: Router,
        private _routeSegment: RouteSegment,
        private _formBuilder: FormBuilder,
        private _appService: AppService,
        private _projectService: ProjectService,
        private _staffService: StaffService
    ) {
        this.form = _formBuilder.group({
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

        if (this._routeSegment.getParam('id') !== 'new') {
            this._projectService.getProjectById(this._routeSegment.getParam('id')).subscribe(
                project => this.project = project,
                errorResponse => this.handleXhrError(errorResponse)
            );
        } else {
            this.project = new Project();
        }

        _staffService.getOrganizations().subscribe(orgs => this.customers = orgs);
        _appService.getUsers().subscribe(users => this.users = users);
    }

    saveProject() {
        this._projectService.saveProject(this.project).subscribe(response => this.close());
    }

    close() {
        this._router.navigate(['/projects']);
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this._router.navigate(['/login']);
        }
    }
}
