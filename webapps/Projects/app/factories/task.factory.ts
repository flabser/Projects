import {Task} from '../models/task';

function createTask(obj: any): Task {
    let result: Task = new Task();

    result.id = obj.id;
    result.author = obj.author;
    result.regDate = obj.regDate;

    result.type = obj.type;
    result.status = obj.status;
    result.priority = obj.priority;
    result.body = obj.body;
    result.assignee = obj.assignee;
    result.startDate = obj.startDate;
    result.dueDate = obj.dueDate;
    result.tags = obj.tags;
    result.attachments = obj.attachments;

    return result;
}

function createTaskList(obj: Array<any>): Task[] {
    let result: Task[] = [];
    obj.forEach((task) => result.push(createTask(task)));
    return result;
}

export const TaskFactory = {
    createTask: createTask,
    createTaskList: createTaskList
}
