import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';

const HEADER = { headers: new Headers({ 'Accept': 'application/json' }) };

@Injectable()
export class ReferenceService {

    constructor(
        private http: Http
    ) {
        this.getTags().subscribe(resp => console.log(resp));
        this.getTaskTypes().subscribe(resp => console.log(resp));
    }

    getTags() {
        let url = '/Reference/p?id=tags';
        return this.http.get(url, HEADER)
            .map(response => response.json().objects[0].list);
    }

    getTaskTypes() {
        let url = '/Reference/p?id=tasktypes';
        return this.http.get(url, HEADER)
            .map(response => response.json().objects[0].list);
    }
}
