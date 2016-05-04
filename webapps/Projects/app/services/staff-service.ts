import {Injectable, Inject} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

const HEADER = { headers: new Headers({ 'Accept': 'application/json' }) };

@Injectable()
export class StaffService {

    constructor(
        private http: Http
    ) {
        this.getOrganizations().subscribe(resp => console.log(resp));
        this.getEmployees().subscribe(resp => console.log(resp));
    }

    getOrganizations() {
        let url = '/Staff/p?id=get-organizations';
        return this.http.get(url, HEADER);
    }

    getEmployees() {
        let url = '/Staff/p?id=employees';
        return this.http.get(url, HEADER);
    }
}
