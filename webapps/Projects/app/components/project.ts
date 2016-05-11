import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouteSegment } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';

import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../shared/notification';
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
    providers: [FormBuilder],
    pipes: [TranslatePipe]
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
        private translate: TranslateService,
        private appService: AppService,
        private projectService: ProjectService,
        private staffService: StaffService,
        private notifyService: NotificationService
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
                error => this.handleXhrError(error)
            );
        } else {
            this.project = new Project();
        }

        staffService.getOrganizations().subscribe(orgs => this.customers = orgs);
        appService.getUsers().subscribe(users => this.users = users);
    }

    saveProject() {
        let noty = this.notifyService.process(this.translate.get('wait_while_document_save')).show();
        this.projectService.saveProject(this.project).subscribe(
            response => {
                noty.set({ type: 'success', message: response.message }).remove(1500);
                this.close();
            },
            error => {
                noty.set({ type: 'error', message: error.message }).remove(1500);
                this.errorSaveProject(error);
            }
        );
    }

    errorSaveProject(errorResponse) {
        console.log(errorResponse);
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
