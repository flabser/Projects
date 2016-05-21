import { Injectable, Inject } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import { Tag, TaskType } from '../models';

@Injectable()
export class ReferenceService {

    private tags: Tag[];
    private taskTypes: TaskType[];

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

    getTags() {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Accept': 'application/json'
        });
        let url = '/Reference/p?id=tags&as=json';

        return this.http.get(url, headers)
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    tags: <Tag[]>data.list,
                    meta: data.meta
                }
            });
    }

    getTaskTypes() {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Accept': 'application/json'
        });
        let url = '/Reference/p?id=tasktypes&as=json';

        return this.http.get(url, headers)
            .map(response => response.json().objects[0])
            .map(data => {
                return {
                    taskTypes: <TaskType[]>data.list,
                    meta: data.meta
                }
            });
    }
}
