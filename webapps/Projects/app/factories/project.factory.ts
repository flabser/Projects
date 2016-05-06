import {Project} from '../models/project';
import {OrganizationFactory} from './organization.factory';
import {AttachmentFactory} from './attachment.factory';

function createProject(obj: any): Project {
    let result: Project = new Project();

    result.id = obj.id;
    result.author = obj.author;
    result.regDate = obj.regDate;

    result.name = obj.name;
    result.status = obj.status;
    result.customer = obj.customer; // OrganizationFactory.createOrganization(obj.customer);
    result.manager = obj.manager;
    result.programmer = obj.programmer;
    result.tester = obj.tester;
    result.observers = obj.observers;
    result.comment = obj.comment;
    result.finishDate = obj.finishDate;
    result.attachments = AttachmentFactory.createAttachmentList(obj.attachments);

    return result;
}

function createProjectList(obj: Array<any>): Project[] {
    let result: Project[] = [];
    obj.forEach(project => result.push(createProject(project)));
    return result;
}

export const ProjectFactory = {
    createProject: createProject,
    createProjectList: createProjectList
}
