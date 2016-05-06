export class User {
    id: string;
    login: string;
    email: string;
    user_name: string = '@anonymous';
    pwd: string;
    pwd_confirm: string;
    organization: string;
    department: string;
    position: string;

    // constructor(obj: any) {
    //     this.id = obj.id;
    //     this.login = obj.login;
    //     this.email = obj.email;
    //     this.user_name = obj.user_name;
    //     this.pwd = obj.pwd;
    //     this.pwd_confirm = obj.pwd_confirm;
    //     this.organization = obj.organization;
    //     this.department = obj.department;
    //     this.position = obj.position;
    // }
}
