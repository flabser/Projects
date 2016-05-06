export class Attachment {
    id: string;
    fieldName: string;
    realFileName: string;
    author: string;
    regDate: Date;
    size: number;

    constructor(obj: any) {
        this.id = obj.id;
        this.fieldName = obj.fieldName;
        this.realFileName = obj.realFileName;
        this.author = obj.author;
        this.regDate = obj.regDate;
        this.size = obj.size;
    }

    url() {
        return 'go-to-file';
    }
}
