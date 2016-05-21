import { Attachment } from './attachment';
import { Tag } from './tag';
import { TaskType } from './task-type';
import { User } from './user';
import { Project } from './project';

export class Task {
    id: string;
    author: User;
    regDate: Date;
    url: string;
    wasRead: boolean;

    project: Project;
    parent: Task;
    children: Task[];
    taskType: TaskType;
    status: string = 'DRAFT';
    priority: string = 'NORMAL';
    body: string;
    assignee: User;
    startDate: Date;
    dueDate: Date;
    tags: Tag[];
    attachments: Attachment[];
}
