import { User } from './user';

export class Attachment {
    id: string;
    fieldName: string;
    realFileName: string;
    author: User;
    regDate: Date;
    size: number;
}
