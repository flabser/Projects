import { Attachment } from './attachment';
import { Tag } from './tag';
import { TaskType } from './task-type';
import { User } from './user';

export class Task {
    id: string;
    author: User;
    regDate: Date;
    url: string;
    wasRead: boolean;

    projectId: string;
    parentId: string;
    childrenIds: string[];
    taskTypeId: string;
    status: string;
    priority: string;
    body: string;
    assigneeUserId: string;
    startDate: Date;
    dueDate: Date;
    tagIds: string[];
    fileIds: string[];
}
