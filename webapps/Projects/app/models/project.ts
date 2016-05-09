import { Attachment } from './attachment';
import { Organization } from './organization';
import { User } from './user';

export const ProjectStatusType = [
    'DRAFT',
    'PROCESSED',
    'FINISHED'
];

export class Project {
    id: string;
    author: User;
    regDate: Date;
    url: string;
    wasRead: boolean;

    name: string;
    status: string;
    customer: string;
    manager: number;
    programmer: number;
    tester: number;
    observers: number[];
    comment: string;
    finishDate: Date;
    attachments: Attachment[];
}
