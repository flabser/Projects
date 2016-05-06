import {Organization} from '../models/organization';

function createOrganization(obj: any): Organization {
    if (!obj) {
        return null;
    }

    let result: Organization = new Organization(obj.id, obj.name);
    return result;
}

function createOrganizationList(obj: Array<any>): Organization[] {
    let result: Organization[] = [];
    obj.forEach((org) => result.push(createOrganization(org)));
    return result;
}

export const OrganizationFactory = {
    createOrganization: createOrganization,
    createOrganizationList: createOrganizationList
}
