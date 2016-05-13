import { Component, Inject, Input } from '@angular/core';

import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { TextTransformPipe } from '../../pipes/text-transform.pipe';

import { NotificationService } from '../../shared/notification';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';

@Component({
    selector: 'project-row',
    template: require('./templates/project-row.html'),
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe]
})

export class ProjectRowComponent {
    @Input() project: Project;
    selected: boolean = false;

    constructor(
        private projectService: ProjectService,
        private notifyService: NotificationService
    ) { }

    toggleSelected() {
        this.selected = !this.selected;
    }

    deleteProject() {
        this.projectService.deleteProject([].concat(this.project)).subscribe();
    }
}
