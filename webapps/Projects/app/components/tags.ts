import {Component} from 'angular2/core';

import {Tag} from '../models/tag';

@Component({
    selector: '[tags]',
    template: require('../templates/tags.html')
})

export class TagsComponent {
    tags: Tag[];
}
