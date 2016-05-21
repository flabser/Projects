import { Component, Inject } from '@angular/core';
import { Router, RouteSegment, RouteTree, OnActivate } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { NotificationService } from '../../shared/notification';
import { SwitchButtonComponent } from '../../shared/switch-button';
import { TextTransformPipe } from '../../pipes';
import { AppService } from '../../services/app.service';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { StaffService } from '../../services/staff.service';
import { Organization } from '../../models/organization';
import { User } from '../../models/user';

@Component({
    selector: 'project',
    template: require('./templates/project.html'),
    directives: [FORM_DIRECTIVES, SwitchButtonComponent, DROPDOWN_DIRECTIVES],
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
            customerUserId: [''],
            managerUserId: [''],
            programmerUserId: [''],
            testerUserId: [''],
            observerUserIds: [''],
            comment: [''],
            finishDate: [''],
            attachments: ['']
        });
    }

    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) {
        this.projectService.getProjectById(this.routeSegment.getParam('id')).subscribe(
            project => this.project = project,
            error => this.handleXhrError(error)
        );

        this.loadData();
    }

    loadData() {
        Observable.forkJoin(
            this.staffService.getOrganizations(),
            this.appService.getUsers(),
            this.projectService.getProjectStatusTypes()
        ).subscribe(
            data => {
                this.customers = data[0].organizations;
                this.users = data[1];
                this.projectStatusTypes = data[2];

                if (this.project.customer) {
                    this.customers.forEach(it => {
                        if (it.id === this.project.customer.id) {
                            this.project.customer = it;
                        }
                    });
                }

                console.log(this);
            },
            error => {
                this.handleXhrError(error)
            },
            () => { this.isReady = true });
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
        console.log(errorResponse);
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }

    setStatus(value) {
        this.project.status = value;
    }

    onScrollSelectList($el, listId) {
        if ($el.scrollHeight <= $el.scrollTop + $el.offsetHeight) {
            if (listId === 'customer') {
                this.searchCustomer({
                    page: 2
                });
            }
        }
    }

    searchCustomer(e) {
        let param = {};
        if (e.target) {
            param = { name: e.target.value };
        } else {
            param = e;
        }
        this.staffService.getOrganizations(param).subscribe(data => {
            this.customers = this.customers.concat(data.organizations);
        });
    }

    selectCustomer(customer: Organization) {
        this.project.customer = customer;
        document.body.click();
    }

    selectManager(user: User) {
        this.project.manager = user;
        document.body.click();
    }

    selectProgrammer(user: User) {
        this.project.programmer = user;
        document.body.click();
    }

    selectTester(user: User) {
        this.project.tester = user;
        document.body.click();
    }

    selectObserver(observer: User) {
        if (!this.project.observers) {
            this.project.observers = [];
        }
        this.project.observers.push(observer);
        document.body.click();
    }

    removeObserver(observer: User, $event) {
        this.project.observers.forEach((it, index) => {
            if (it.id === observer.id) {
                this.project.observers.splice(index, 1);
            }
        });

        $event.stopPropagation();
        document.body.click();
    }
}
