import { Component, Inject } from '@angular/core';
import { Router, RouteSegment, RouteTree, OnActivate } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { NotificationService } from '../shared/notification';
import { SwitchButtonComponent } from '../shared/switch-button';
import { TextTransformPipe } from '../pipes/text-transform.pipe';
import { AppService } from '../services/app.service';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import { StaffService } from '../services/staff.service';
import { Organization } from '../models/organization';
import { User } from '../models/user';

@Component({
    selector: '[project]',
    template: require('../templates/project.html'),
    directives: [FORM_DIRECTIVES, SwitchButtonComponent],
    providers: [FormBuilder],
    pipes: [TranslatePipe, TextTransformPipe]
})

export class ProjectComponent {
    isReady = false;
    project: Project;
    form: ControlGroup;
    users: User[];
    customers: Organization[];
    projectStatusTypes: any;

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
    }

    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) {
        if (this.routeSegment.getParam('id') !== 'new') {
            this.projectService.getProjectById(this.routeSegment.getParam('id')).subscribe(
                project => this.project = project,
                error => this.handleXhrError(error)
            );
        } else {
            this.project = new Project();
        }

        this.loadData();
    }

    loadData() {
        Observable.forkJoin(
            this.staffService.getOrganizations(),
            this.appService.getUsers(),
            this.projectService.getProjectStatusTypes()
        ).subscribe(
            data => {
                this.customers = data[0];
                this.users = data[1];
                this.projectStatusTypes = data[2];
            },
            error => {
                this.handleXhrError(error)
            },
            () => { this.isReady = true });

        // this.staffService.getOrganizations().subscribe(orgs => this.customers = orgs);
        // this.appService.getUsers().subscribe(users => this.users = users);
        // this.projectService.getProjectStatusTypes().subscribe(result => this.projectStatusTypes = result);
    }

    saveProject() {
        let noty = this.notifyService.process(this.translate.instant('wait_while_document_save')).show();
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

    setStatus(value) {
        this.project.status = value;
    }
}
