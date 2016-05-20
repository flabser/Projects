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
    projectId: string;

    parentId: string;
    childrenIds: string[];

    taskType: TaskType;
    taskTypeId: string;

    status: string;
    priority: string;
    body: string;

    assigneeUser: User;
    assigneeUserId: string;

    startDate: Date;
    dueDate: Date;

    tags: Tag[] = [];
    tagIds: string[];
    fileIds: string[];
}
