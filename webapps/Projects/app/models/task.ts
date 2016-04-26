import {Attachment} from './attachment';
import {Tag} from './tag';
import {TaskType} from './task-type';
import {User} from './user';

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
    assignee: User;
    startDate: Date;
    dueDate: Date;
    tags: Tag[];
    attachments: Attachment[];
}
