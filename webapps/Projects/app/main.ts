import {bootstrap} from 'angular2/platform/browser';
import {provide, enableProdMode} from 'angular2/core';
import {HTTP_PROVIDERS, RequestOptions, BaseRequestOptions, Headers} from 'angular2/http';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';
import 'rxjs/Rx';

import {App} from './components/app';
import {AppService} from './services/app-service';
import {TaskService} from './services/task-service';
import {ProjectService} from './services/project-service';
import {ReferenceService} from './services/reference-service';
import {StaffService} from './services/staff-service';

declare let __PRODUCTION__: any;
if (__PRODUCTION__) {
    enableProdMode();
}

/*class MyBaseRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers({
        'X-Requested-With': 'XMLHttpRequest'
    });
    withCredentials: boolean = true;
}*/

bootstrap(App, [
    HTTP_PROVIDERS,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    // provide(RequestOptions, { useClass: MyBaseRequestOptions }),
    FORM_PROVIDERS,
    AppService,
    TaskService,
    ProjectService,
    ReferenceService,
    StaffService
]).catch(err => console.error(err));
