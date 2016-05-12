import { Component } from '@angular/core';

import { Attachment } from '../models/attachment';

@Component({
    selector: '[attachments]',
    template: '<div class="attachments">attachments</div>'
})

export class AttachmentsComponent {
    attachments: Attachment[];
}
