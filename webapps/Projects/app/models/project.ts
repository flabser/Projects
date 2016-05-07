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
    id: string;
    author: User;
    regDate: Date;
    url: string;

    name: string;
    status: number;
    customer: string;
    manager: number;
    programmer: number;
    tester: number;
    observers: number[];
    comment: string;
    finishDate: Date;
    attachments: Attachment[];
}
