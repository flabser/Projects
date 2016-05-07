import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ReferenceService {

    constructor(
        private http: Http
    ) { }

    getTags() {
        let header = { headers: new Headers({ 'Accept': 'application/json' }) };
        let url = '/Reference/p?id=tags';

        return this.http.get(url, header)
            .map(response => response.json().objects[0].list);
    }

    getTaskTypes() {
        let header = { headers: new Headers({ 'Accept': 'application/json' }) };
        let url = '/Reference/p?id=tasktypes';

        return this.http.get(url, header)
            .map(response => response.json().objects[0].list);
    }
}
