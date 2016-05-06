import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {User} from '../models/user';

const HEADER = { headers: new Headers({ 'Accept': 'application/json' }) };

@Injectable()
export class AppService {

    constructor(
        private _http: Http
    ) { }

    getTranslations() {
        let url = 'p?id=common-captions';
        return this._http.get(url, HEADER)
            .map(response => response.json().captions);
    }

    getNav() {
        let url = 'p?id=outline';
        return this._http.get(url, HEADER);
    }

    getUsers() {
        let url = 'p?id=users';
        return this._http.get(url, HEADER)
            .map(response => response.json().objects[0].list);
    }

    updateUserProfile(user: User) {
        //
    }

    logout() {
        return this._http.delete('');
    }
}
