import {Attachment} from './attachment';
import {Tag} from './tag';
import {TaskType} from './task-type';
import {User} from './user';

export const TaskPriorityType = [
    'HEIGHEST',
    'HEIGHT',
    'MEDIUM',
    'NORMAL'
];

export const TaskStatusType = [
    'DRAFT',
    'WAITING',
    'PROCESSED',
    'FINISHED'
];

export class Task {
    id: string;
    author: User;
    regDate: Date;
    wasRead: boolean;

    parent: Task;
    children: Task[];

    type: TaskType;
    status: string;
    priority: string;
    body: string;
    assignee: number;
    startDate: Date;
    dueDate: Date;
    tags: Tag[];
    attachments: Attachment[];
}
