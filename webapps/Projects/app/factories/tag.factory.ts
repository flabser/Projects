import {Tag} from '../models/tag';

function createTag(obj: any): Tag {
    if (!obj) {
        return null;
    }

    let result: Tag = new Tag(obj.id, obj.name);
    return result;
}

function createTagList(obj: Array<any>): Tag[] {
    let result: Tag[] = [];
    obj.forEach((tag) => result.push(createTag(tag)));
    return result;
}

export const TagFactory = {
    createTag: createTag,
    createTagList: createTagList
}
