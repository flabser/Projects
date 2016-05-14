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
    customerUserId: string;
    managerUserId: string;
    programmerUserId: string;
    testerUserId: string;
    observerUserIds: string[];
    comment: string;
    finishDate: Date;
    fileIds: Attachment[];
}
