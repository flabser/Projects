import { Organization } from './organization';

export class User {
    id: string;
    login: string;
    email: string;
    userName: string = '@anonymous';
    pwd: string;
    pwdConfirm: string;
    organization: Organization;
    department: string;
    position: string;
}
