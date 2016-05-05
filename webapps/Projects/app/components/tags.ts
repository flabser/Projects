import {Component} from '@angular/core';

import {Tag} from '../models/tag';

@Component({
    selector: '[tags]',
    template: require('../templates/tags.html')
})

export class TagsComponent {
    tags: Tag[];
}
