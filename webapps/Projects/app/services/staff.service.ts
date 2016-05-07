import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class StaffService {

    constructor(
        private http: Http
    ) { }

    getOrganizations() {
        let header = { headers: new Headers({ 'Accept': 'application/json' }) };
        let url = '/Staff/p?id=get-organizations';

        return this.http.get(url, header)
            .map(response => response.json().objects[0].list);
    }
}
