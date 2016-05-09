import { bootstrap } from '@angular/platform-browser-dynamic';
import { bind, provide, enableProdMode, PLATFORM_DIRECTIVES } from '@angular/core';
import { HTTP_PROVIDERS, RequestOptions, BaseRequestOptions, Headers } from '@angular/http';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { FORM_PROVIDERS, LocationStrategy, HashLocationStrategy } from '@angular/common';
import 'rxjs/Rx';

import { App } from './components/app';
import { NBNotifyComponent } from './components/nb-notify';
import { AppService } from './services/app.service';
import { TaskService } from './services/task.service';
import { ProjectService } from './services/project.service';
import { ReferenceService } from './services/reference.service';
import { StaffService } from './services/staff.service';

declare let __PRODUCTION__: any;
if (__PRODUCTION__) {
    enableProdMode();
}

bootstrap(App, [
    HTTP_PROVIDERS,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    provide(PLATFORM_DIRECTIVES, { useValue: ROUTER_DIRECTIVES, multi: true }),
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    FORM_PROVIDERS,
    NBNotifyComponent,
    AppService,
    TaskService,
    ProjectService,
    ReferenceService,
    StaffService
]).catch(err => console.error(err));
