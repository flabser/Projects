import {Attachment} from './attachment';
import {Tag} from './tag';
import {TaskType} from './task-type';
import {User} from './user';
import {serializeObj} from '../utils/obj-utils';

export const TaskPriorityType = {
    UNKNOWN: 0,
    HEIGHEST: 1,
    HEIGHT: 2,
    MEDIUM: 3,
    NORMAL: 4
};

export const TaskStatusType = {
    UNKNOWN: 0,
    DRAFT: 453,
    WAITING: 454,
    PROCESSED: 455,
    FINISHED: 456
};

export class Task {
    id: string;
    author: User;
    regDate: Date;

    parent: Task;
    children: Task[];

    type: TaskType;
    status: number;
    priority: number;
    body: string;
    assignee: number;
    startDate: Date;
    dueDate: Date;
    tags: Tag[];
    attachments: Attachment[];

    serialize(): string {
        return serializeObj({
            type: this.type.id,
            status: this.status,
            priority: this.priority,
            body: this.body,
            assignee: this.assignee,
            start_date: this.startDate,
            due_date: this.dueDate,
            tags: Array.isArray(this.tags) ? this.tags.map(it => it.id).join(',') : this.tags,
            attachments: Array.isArray(this.attachments) ? this.attachments.map(it => it.id).join(',') : ''
        });
    }
}
