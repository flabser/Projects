import {Project} from '../models/project';

export const PROJECT_ACTION = {
    SAVE_PROJECT: 'SAVE_PROJECT',
    REMOVE_PROJECT: 'REMOVE_PROJECT'
};

export class ProjectActions {
    constructor() { }

    saveTask(project: Project) {
        console.log(project);
        return {
            type: PROJECT_ACTION.SAVE_PROJECT,
            project: project
        };
    }

    removeTask(id) {
        return {
            type: PROJECT_ACTION.REMOVE_PROJECT,
            id: id
        };
    }
}
