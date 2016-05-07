import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {User} from '../models/user';

@Injectable()
export class AppService {

    constructor(
        private _http: Http
    ) { }

    getTranslations() {
        let header = { headers: new Headers({ 'Accept': 'application/json' }) };
        let url = 'p?id=common-captions';

        return this._http.get(url, header)
            .map(response => response.json().captions);
    }

    getNav() {
        let header = { headers: new Headers({ 'Accept': 'application/json' }) };
        let url = 'p?id=outline';

        return this._http.get(url, header);
    }

    getUsers() {
        let header = { headers: new Headers({ 'Accept': 'application/json' }) };
        let url = 'p?id=users';

        return this._http.get(url, header)
            .map(response => response.json().objects[0].list);
    }

    updateUserProfile(user: User) {
        //
    }

    logout() {
        return this._http.delete('/');
    }
}
