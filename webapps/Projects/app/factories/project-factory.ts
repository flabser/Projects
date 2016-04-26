import {Project} from '../models/project';

export function createProject(json: any): Project {
    let result: Project = new Project();

    // console.log('factory:createProject', json);

    result.id = json.id;
    result.author = json.author;
    result.regDate = json.regDate;

    result.name = json.name;
    result.status = json.status;
    result.customer = null; //json.customer;
    result.manager = null; //json.manager;
    result.programmer = null; //json.programmer;
    result.tester = null; //json.tester;
    result.observers = null; //json.observers;
    result.comment = json.comment;
    result.finishDate = json.finishDate;
    result.attachments = null; //json.attachments;

    return result;
}

function createProjectList(json: Array<any>): Project[] {
    let result: Project[] = [];
    json.forEach((project) => result.push(createProject(project)));
    return result;
}

export const ProjectFactory = {
    createProject: createProject,
    createProjectList: createProjectList
}
