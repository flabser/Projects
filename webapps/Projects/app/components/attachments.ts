import {Component} from '@angular/core';

import {Attachment} from '../models/attachment';

@Component({
    selector: '[attachments]',
    template: require('../templates/attachments.html')
})

export class AttachmentsComponent {
    attachments: Attachment[];
}
