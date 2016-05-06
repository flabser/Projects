import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';

const HEADER = { headers: new Headers({ 'Accept': 'application/json' }) };

@Injectable()
export class StaffService {

    constructor(
        private http: Http
    ) { }

    getOrganizations() {
        let url = '/Staff/p?id=get-organizations';
        return this.http.get(url, HEADER)
            .map(response => response.json().objects[0].list);
    }
}
