import {Component} from '@angular/core';

import {Attachment} from '../models/attachment';

@Component({
    selector: '[attachment]',
    template: '<div class="attachment">{{attachment.realFileName}}</div>'
})

export class AttachmentComponent {
    attachment: Attachment;
}
