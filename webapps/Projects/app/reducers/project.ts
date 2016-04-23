import {PROJECT_ACTION} from '../actions/project';
import {Project} from '../models/project';

const initialState: Project[] = [new Project(), new Project(), new Project()];

export default (state = initialState, action: any = {}) => {
    console.log('reducer project', action, state);

    switch (action.type) {
        case PROJECT_ACTION.GET_PROJECTS:
            return state;

        case PROJECT_ACTION.SAVE_PROJECT:
            return state;

        case PROJECT_ACTION.REMOVE_PROJECT:
            return state;

        default:
            return state;
    }
}
