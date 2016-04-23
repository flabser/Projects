import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {Project} from '../models/project';

@Component({
    selector: '[projects]',
    template: require('../templates/projects.html')
})

export class ProjectsComponent {
    projects: Project[];

    constructor(private _router: Router) {}

    composeRecord() {
        this._router.navigate(['Project', { id: 'new' }]);
    }

    deleteProject(project: Project) {
        
    }
}
