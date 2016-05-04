import {Component, Inject, OnInit} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {FORM_PROVIDERS, FormBuilder, Validators, ControlGroup, Control} from 'angular2/common';

import {Project} from '../models/project';
import {ProjectService} from '../services/project-service';
import {ProjectFactory} from '../factories/project-factory';

@Component({
    selector: '[project]',
    template: require('../templates/project.html')
})

export class ProjectComponent implements OnInit {
    project: Project = new Project();

    projectForm: ControlGroup;

    name: Control;
    status: Control;
    customer: Control;
    manager: Control;
    programmer: Control;
    tester: Control;
    observers: Control;
    comment: Control;
    finishDate: Control;
    attachments: Control;

    constructor(
        private _projectService: ProjectService,
        private _router: Router,
        private _params: RouteParams,
        private _formBuilder: FormBuilder
    ) {
        this.name = new Control('');
        this.status= new Control('');
        this.customer= new Control('');
        this.manager= new Control('');
        this.programmer= new Control('');
        this.tester= new Control('');
        this.observers= new Control('');
        this.comment= new Control('');
        this.finishDate= new Control('');
        this.attachments= new Control('');

        this.projectForm = _formBuilder.group({
            name: this.name,
            status: this.status,
            customer: this.customer,
            manager: this.manager,
            programmer: this.programmer,
            tester: this.tester,
            observers: this.observers,
            comment: this.comment,
            finishDate: this.finishDate,
            attachments: this.attachments
        });

        if (this._params.get('id') !== 'new') {
            this._projectService.getProjectById(this._params.get('id')).subscribe(project => {
                console.log('form ', project);
                this.project = project;
            }, project => {
                console.log('form2 ', project);
                this.project = ProjectFactory.createProject(project.json().objects[1]);
            });

            this.project.id = this._params.get('id');
        }
    }

    ngOnInit() {
        
    }

    saveProject() {
        this._projectService.saveProject(this.project).subscribe(response => this.close());
    }

    close() {
        this._router.navigate(['Projects']);
    }
}
