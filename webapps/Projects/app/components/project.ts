import {Component, Inject, OnInit} from '@angular/core';
import {Router, RouteSegment} from '@angular/router';
import {FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES} from '@angular/common';

import {Project} from '../models/project';
import {ProjectService} from '../services/project.service';
import {ProjectFactory} from '../factories/project.factory';
import {AppService} from '../services/app.service';
import {User} from '../models/user';

@Component({
    selector: '[project]',
    template: require('../templates/project.html'),
    directives: [FORM_DIRECTIVES],
    providers: [FormBuilder]
})

export class ProjectComponent implements OnInit {
    users: User[];
    project: Project;

    form: ControlGroup;

    constructor(
        private _router: Router,
        private _routeSegment: RouteSegment,
        private _formBuilder: FormBuilder,
        private _projectService: ProjectService,
        private _appService: AppService
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
