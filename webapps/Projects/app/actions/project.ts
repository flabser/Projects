import {Project} from '../models/project';

export const PROJECT_ACTION = {
    GET_PROJECTS: 'GET_PROJECTS',
    SAVE_PROJECT: 'SAVE_PROJECT',
    REMOVE_PROJECT: 'REMOVE_PROJECT'
};

export class ProjectActions {
    constructor() { }

    saveProject(project: Project) {
        console.log('ProjectActions', project);

        return {
            type: PROJECT_ACTION.SAVE_PROJECT,
            project: project
        };
    }

    removeProject(id) {
        return {
            type: PROJECT_ACTION.REMOVE_PROJECT,
            id: id
        };
    }
}
