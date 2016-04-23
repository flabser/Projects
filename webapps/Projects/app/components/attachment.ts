import {Component} from 'angular2/core';

import {Attachment} from '../models/attachment';

@Component({
    selector: '[attachment]',
    template: require('../templates/attachment.html')
})

export class AttachmentComponent {
    attachment: Attachment;
}
