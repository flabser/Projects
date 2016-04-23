import {TASK_ACTION} from '../actions/task';
import {Task} from '../models/task';

const initialState: Task[] = [new Task(), new Task(), new Task()];

export default (state = initialState, action: any = {}) => {
    console.log('reducer task', action, state);

    switch (action.type) {
        case TASK_ACTION.GET_TASKS:
            return state;

        case TASK_ACTION.SAVE_TASK:
            return state;

        case TASK_ACTION.REMOVE_TASK:
            return state;

        default:
            return state;
    }
}
