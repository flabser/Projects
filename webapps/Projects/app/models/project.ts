import {Attachment} from './attachment';
import {Organization} from './organization';
import {User} from './user';
import {serializeObj} from '../utils/obj-utils';

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
    customer: Organization;
    manager: number;
    programmer: number;
    tester: number;
    observers: number[];
    comment: string;
    finishDate: Date = new Date();
    attachments: Attachment[];

    serialize(): string {
        return serializeObj({
            name: this.name,
            status: this.status,
            customer: this.customer || 0,
            manager: this.manager || 0,
            programmer: this.programmer || 0,
            tester: this.tester || 0,
            observers: this.observers ? this.observers.join(',') : '',
            comment: this.comment,
            finishDate: this.finishDate ? this.finishDate.toString() : '',
            attachments: '' //this.attachments.join('')
        });
    }
}
