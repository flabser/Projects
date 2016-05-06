import {Attachment} from '../models/attachment';

function createAttachment(obj: any): Attachment {
    if (!obj) {
        return null;
    }

    let result: Attachment = new Attachment(obj);
    return result;
}

function createAttachmentList(obj: Array<any>): Attachment[] {
    let result: Attachment[] = [];
    obj.forEach((att) => result.push(createAttachment(att)));
    return result;
}

export const AttachmentFactory = {
    createAttachment: createAttachment,
    createAttachmentList: createAttachmentList
}
