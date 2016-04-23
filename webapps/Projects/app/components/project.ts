import {Component, Inject, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {Project} from '../models/project';
import {ProjectActions} from '../actions/project';

@Component({
    selector: '[project]',
    template: require('../templates/project.html')
})

export class ProjectComponent implements OnInit {
    project: Project;

    constructor(
        @Inject('AppStore') private appStore,
        private projectActions: ProjectActions,
        private _router: Router
    ) { }

    ngOnInit() {
        this.project = new Project();
    }

    onSubmit() {
        this.appStore.dispatch(this.projectActions.saveTask(this.project));
    }

    close() {
        this._router.navigate(['Projects']);
    }
}
