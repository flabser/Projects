import {Task} from '../models/task';

export const TASK_ACTION = {
    SAVE_TASK: 'SAVE_TASK',
    REMOVE_TASK: 'REMOVE_TASK'
};

export class TaskActions {
    constructor() { }

    saveTask(task: Task) {
        console.log(task);
        return {
            type: TASK_ACTION.SAVE_TASK,
            task: task
        };
    }

    removeTask(id) {
        return {
            type: TASK_ACTION.REMOVE_TASK,
            id: id
        };
    }
}
