import {Injectable, Inject} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

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
        let url = '/Reference/p?id=tag-view';
        return this.http.get(url, HEADER);
    }

    getTaskTypes() {
        let url = '/Reference/p?id=tasktype-view';
        return this.http.get(url, HEADER);
    }
}
