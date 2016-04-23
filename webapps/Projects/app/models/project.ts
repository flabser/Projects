import {Attachment} from './attachment';
import {Organization} from './organization';
import {User} from './user';

export const ProjectStatusType = {
    UNKNOWN: 0,
    DRAFT: 899, 
    PROCESSED: 900,
    FINISHED: 901
};

export class Project {
    docid: string;
    author: User;
    regDate: Date;

    name: string;
    status: number;
    customer: Organization;
    manager: User;
    programmer: User;
    tester: User;
    observers: User[];
    comment: string;
    finishDate: Date;
    attachments: Attachment[];
}
