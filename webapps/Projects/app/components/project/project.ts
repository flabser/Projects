import { Component, Inject } from '@angular/core';
import { Router, RouteSegment, RouteTree, OnActivate } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { NotificationService } from '../../shared/notification';
import { SwitchButtonComponent } from '../../shared/switch-button';
import { TextTransformPipe } from '../../pipes';
import { AppService, ProjectService, TaskService, StaffService, ReferenceService } from '../../services';
import { Project, Organization, User } from '../../models';

@Component({
    selector: 'project',
    styles: [`project { display: block; }`],
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
    private to;

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

    closeDropdown() {
        document.body.click();
    }

    onScrollSelectList($el, listId) {
        // if end scroll
        if ($el.scrollHeight <= $el.scrollTop + $el.offsetHeight) {
            if (listId === 'customer') {
                this.searchCustomer({
                    page: 2
                });
            }
        }
    }

    searchCustomer(e) {
        let param: any = {};
        if (e.target) {
            param.keyword = e.target.value;
        } else {
            param = e;
        }
        this.staffService.getOrganizations(param).subscribe(data => {
            if (param.keyword) {
                this.customers = data.organizations;
            } else {
                this.customers = this.customers.concat(data.organizations);
            }
        });
    }

    selectCustomer(customer: Organization) {
        this.project.customer = customer;
        this.closeDropdown();
    }

    selectManager(user: User) {
        this.project.manager = user;
        this.closeDropdown();
    }

    selectProgrammer(user: User) {
        this.project.programmer = user;
        this.closeDropdown();
    }

    selectTester(user: User) {
        this.project.tester = user;
        this.closeDropdown();
    }

    selectObserver(observer: User) {
        if (!this.project.observers) {
            this.project.observers = [];
        }
        this.project.observers.push(observer);
        this.closeDropdown();
    }

    removeObserver(observer: User, $event) {
        this.project.observers.forEach((it, index) => {
            if (it.id === observer.id) {
                this.project.observers.splice(index, 1);
            }
        });

        $event.stopPropagation();
        this.closeDropdown();
    }
}
