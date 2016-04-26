import { Task } from '../models/task';

export function createTask(json: any): Task {
    let result: Task = new Task();

    // console.log('factory:createTask', json);

    result.id = json.id;
    result.author = json.author;
    result.regDate = json.regDate;

    result.type = json.type;
    result.status = json.status;
    result.priority = json.priority;
    result.body = json.body;
    result.assignee = json.assignee;
    result.startDate = json.startDate;
    result.dueDate = json.dueDate;
    result.tags = json.tags;
    result.attachments = null; // json.attachments;

    return result;
}

function createTaskList(json: Array<any>): Task[] {
    let result: Task[] = [];
    json.forEach((task) => result.push(createTask(task)));
    return result;
}

export const TaskFactory = {
    createTask: createTask,
    createTaskList: createTaskList
}
