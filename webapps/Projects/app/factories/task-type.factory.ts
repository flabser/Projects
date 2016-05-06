import {TaskType} from '../models/task-type';

function createTaskType(obj: any): TaskType {
    if (!obj) {
        return null;
    }

    let result: TaskType = new TaskType(obj.id, obj.name);
    return result;
}

function createTaskTypeList(obj: Array<any>): TaskType[] {
    let result: TaskType[] = [];
    obj.forEach((tt) => result.push(createTaskType(tt)));
    return result;
}

export const TaskTypeFactory = {
    createTaskType: createTaskType,
    createTaskTypeList: createTaskTypeList
}
