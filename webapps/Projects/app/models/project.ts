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
    manager: User;
    programmer: User;
    tester: User;
    observers: User[];
    comment: string;
    finishDate: Date = new Date();
    attachments: Attachment[];

    serialize(): string {
        return serializeObj({
            name: this.name,
            status: this.status,
            customer: 0, //this.customer.id,
            manager: 0, //this.manager.login,
            programmer: 0, //this.programmer.login,
            tester: 0, //this.tester.login,
            observers: '', //this.observers.join(','),
            comment: this.comment,
            finishDate: this.finishDate && this.finishDate.toString(),
            attachments: '' //this.attachments.join('')
        });
    }
}
