import {Component, Inject, OnInit} from '@angular/core';
import {Router, RouteSegment} from '@angular/router';
import {FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES} from '@angular/common';

import {AppService} from '../services/app.service';
import {Project} from '../models/project';
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

export class ProjectComponent implements OnInit {
    project: Project;
    form: ControlGroup;
    users: User[];
    customers: Organization[];

    constructor(
        private _router: Router,
        private _routeSegment: RouteSegment,
        private _formBuilder: FormBuilder,
        private _appService: AppService,
        private _projectService: ProjectService,
        private _staffService: StaffService
    ) {
        this.form = _formBuilder.group({
            name: new Control('', Validators.required),
            status: new Control(''),
            customer: new Control(''),
            manager: new Control(''),
            programmer: new Control(''),
            tester: new Control(''),
            observers: new Control(''),
            comment: new Control(''),
            finishDate: new Control(''),
            attachments: new Control('')
        });

        if (this._routeSegment.getParam('id') !== 'new') {
            this._projectService.getProjectById(this._routeSegment.getParam('id')).subscribe(
                project => {
                    this.project = project;
                },
                err => {
                    console.log(err);
                }
            );
        } else {
            this.project = new Project();
        }

        _staffService.getOrganizations().subscribe(orgs => this.customers = orgs);
        _appService.getUsers().subscribe(users => this.users = users);
    }

    ngOnInit() {

    }

    saveProject() {
        this._projectService.saveProject(this.project).subscribe(response => this.close());
    }

    close() {
        this._router.navigate(['/projects']);
    }
}
