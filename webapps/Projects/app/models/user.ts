export class User {
    id: string;
    login: string;
    email: string;
    userName: string = '@anonymous';
    pwd: string;
    pwd_confirm: string;
    organization: string;
    department: string;
    position: string;
}
