import {TASK_ACTION} from '../actions/task';
import {Task} from '../models/task';

export default (state = new Task(), action: any = {}) => {
    switch (action.type) {
        case TASK_ACTION.SAVE_TASK:
            return state = new Task();

        case TASK_ACTION.REMOVE_TASK:
            return state;

        default:
            return state;
    }
}
