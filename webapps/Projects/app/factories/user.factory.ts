import {User} from '../models/user';

function createUser(obj: any): User {
    let result: User = new User();

    result.id = obj.id;
    result.login = obj.login;
    result.email = obj.email;
    result.user_name = obj.user_name;
    result.pwd = obj.pwd;
    result.pwd_confirm = obj.pwd_confirm;
    result.organization = obj.organization;
    result.department = obj.department;
    result.position = obj.position;

    return result;
}

function createUserList(obj: Array<any>): User[] {
    let result: User[] = [];
    obj.forEach((task) => result.push(createUser(task)));
    return result;
}

export const UserFactory = {
    createUser: createUser,
    createUserList: createUserList
}
