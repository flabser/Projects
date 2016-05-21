import { Component, Inject, Input } from '@angular/core';

import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { TextTransformPipe, DateFormatPipe } from '../../pipes';

import { NotificationService } from '../../shared/notification';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'task-row',
    template: require('./templates/task-row.html'),
    pipes: [DateFormatPipe, TranslatePipe, TextTransformPipe]
})

export class TaskRowComponent {
    @Input() task: Task;
    selected: boolean = false;

    constructor(
        private taskService: TaskService,
        private notifyService: NotificationService
    ) { }

    toggleSelected() {
        this.selected = !this.selected;
    }

    deleteTask(task: Task) {
        // this.taskService.deleteTask(task).subscribe();
    }
}
