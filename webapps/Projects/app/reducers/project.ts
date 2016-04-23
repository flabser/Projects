import {PROJECT_ACTION} from '../actions/project';
import {Project} from '../models/project';

export default (state = new Project(), action: any = {}) => {
    switch (action.type) {
        case PROJECT_ACTION.SAVE_PROJECT:
            return state = new Project();

        case PROJECT_ACTION.REMOVE_PROJECT:
            return state;

        default:
            return state;
    }
}
