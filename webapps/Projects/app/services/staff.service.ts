import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import { Organization } from '../models/organization';

@Injectable()
export class StaffService {

    constructor(
        private http: Http
    ) { }

    createURLSearchParams(_params): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();
        for (let p in _params) {
            params.set(encodeURIComponent(p), encodeURIComponent(_params[p]));
        }
        return params;
    }

    getOrganizations(params?) {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Accept': 'application/json'
        });
        let url = '/Staff/p?id=get-organizations';

        return this.http.get(url, {
            headers: headers,
            search: this.createURLSearchParams(params)
        })
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    organizations: <Organization[]>data.list,
                    meta: data.meta
                }
            });
    }
}
