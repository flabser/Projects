import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, RouteSegment, RouteTree, OnActivate } from '@angular/router';
import { FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { DROPDOWN_DIRECTIVES } from '../../shared/dropdown';
import { NotificationService } from '../../shared/notification';
import { SwitchButtonComponent } from '../../shared/switch-button';
import { TextTransformPipe } from '../../pipes';
import { AppService } from '../../services/app.service';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { ReferenceService } from '../../services/reference.service';
import { Project } from '../../models/project';
import { Task } from '../../models/task';
import { Tag } from '../../models/tag';
import { TaskType } from '../../models/task-type';
import { User } from '../../models/user';

@Component({
    selector: 'task',
    template: require('./templates/task.html'),
    directives: [FORM_DIRECTIVES, SwitchButtonComponent, DROPDOWN_DIRECTIVES],
    providers: [FormBuilder],
    pipes: [TranslatePipe, TextTransformPipe]
})

export class TaskComponent {
    isReady = false;
    task: Task;
    form: ControlGroup;

    users: User[];
    tags: Tag[];
    projects: Project[];
    taskTypes: TaskType[];
    taskPriorityTypes: any;
    taskStatusTypes: any;

    constructor(
        private router: Router,
        private routeSegment: RouteSegment,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private appService: AppService,
        private projectService: ProjectService,
        private taskService: TaskService,
        private referenceService: ReferenceService,
        private notifyService: NotificationService
    ) {
        this.form = formBuilder.group({
            projectId: [''],
            taskTypeId: [''],
            status: [''],
            priority: [''],
            body: ['', Validators.required],
            assigneeUserId: [''],
            startDate: [''],
            dueDate: [''],
            tagIds: [''],
            attachments: ['']
        });
    }

    routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) {
        this.taskService.getTaskById(this.routeSegment.getParam('id')).subscribe(
            task => {
                this.task = task;
                // resolve related data
                this.loadData();
            },
            errorResponse => this.handleXhrError(errorResponse)
        );
    }

    loadData() {
        Observable.forkJoin(
            this.appService.getUsers(),
            this.projectService.getProjects(),
            this.referenceService.getTags(),
            this.referenceService.getTaskTypes(),
            this.taskService.getTaskStatusType(),
            this.taskService.getTaskPriorityType()
        ).subscribe(
            data => {
                this.users = data[0];
                this.projects = data[1].projects;
                this.tags = data[2];
                this.taskTypes = data[3];
                this.taskStatusTypes = data[4];
                this.taskPriorityTypes = data[5];

                if (this.task.taskType) {
                    this.taskTypes.forEach(it => {
                        if (it.id === this.task.taskType.id) {
                            this.task.taskType = it;
                        }
                    });
                }
                if (this.task.project) {
                    this.projects.forEach(it => {
                        if (it.id === this.task.project.id) {
                            this.task.project = it;
                        }
                    });
                }
                if (this.task.tags) {
                    let tts = this.task.tags.map(it => it.id);
                    this.task.tags = this.tags.filter(it => tts.indexOf(it.id) != -1);
                }

                console.log(this);
            },
            error => {
                this.handleXhrError(error)
            },
            () => this.isReady = true);
    }

    saveTask() {
        let noty = this.notifyService.process(this.translate.get('wait_while_document_save')).show();
        this.taskService.saveTask(this.task).subscribe(
            response => {
                noty.set({ type: 'success', message: response.message }).remove(1500);
                this.close();
            },
            error => {
                noty.set({ type: 'error', message: error.message }).remove(1500);
                this.errorSaveTask(error);
            }
        );
    }

    errorSaveTask(errorResponse) {
        console.log(errorResponse);
    }

    close() {
        this.router.navigate(['/tasks']);
    }

    handleXhrError(errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
    }

    setStatus(value) {
        this.task.status = value;
    }

    setPriority(value) {
        this.task.priority = value;
    }

    onScrollSelectList($el, listId) {
        if ($el.scrollHeight <= $el.scrollTop + $el.offsetHeight) {
            if (listId === 'project') {
                this.searchProject({
                    page: 2
                });
            }
        }
    }

    searchProject(e) {
        let param = {};
        if (e.target) {
            param = { name: e.target.value };
        } else {
            param = e;
        }
        this.projectService.getProjects(param).subscribe(data => {
            this.projects = this.projects.concat(data.projects);
        });
    }

    selectProject(project: Project) {
        this.task.project = project;
        document.body.click();
    }

    selectTaskType(taskType: TaskType) {
        this.task.taskType = taskType;
        document.body.click();
    }

    selectAssigneeUser(assigneeUser: User) {
        this.task.assignee = assigneeUser;
        document.body.click();
    }

    selectTag(tag: Tag) {
        if (!this.task.tags) {
            this.task.tags = [];
        }
        this.task.tags.push(tag);
        document.body.click();
    }

    removeTag(tag: Tag, $event) {
        this.task.tags.forEach((it, index) => {
            if (it.id === tag.id) {
                this.task.tags.splice(index, 1);
            }
        });

        $event.stopPropagation();
        document.body.click();
    }

    ngOnDestroy() {
        this.users = [];
        this.tags = [];
        this.projects = [];
        this.taskTypes = [];
        this.taskPriorityTypes = [];
        this.taskStatusTypes = [];
    }
}
