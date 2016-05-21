import { Attachment } from './attachment';
import { Organization } from './organization';
import { User } from './user';

export class Project {
    id: string;
    author: User;
    regDate: Date;
    url: string;
    wasRead: boolean;

    name: string;
    status: string;
    customer: Organization;
    manager: User;
    programmer: User;
    tester: User;
    observers: User[];
    comment: string;
    finishDate: Date;
    attachments: Attachment[];
}
