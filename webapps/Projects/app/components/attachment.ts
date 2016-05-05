import {Component} from '@angular/core';

import {Attachment} from '../models/attachment';

@Component({
    selector: '[attachment]',
    template: require('../templates/attachment.html')
})

export class AttachmentComponent {
    attachment: Attachment;
}
