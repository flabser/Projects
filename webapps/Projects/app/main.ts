import { bootstrap } from '@angular/platform-browser-dynamic';
import { bind, provide, enableProdMode, PLATFORM_DIRECTIVES } from '@angular/core';
import { Http, Response, HTTP_PROVIDERS, RequestOptions, BaseRequestOptions, Headers } from '@angular/http';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { FORM_PROVIDERS, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { TRANSLATE_PROVIDERS, TranslateService, TranslatePipe, TranslateLoader } from 'ng2-translate/ng2-translate';
import {Observable} from 'rxjs/Observable'
import 'rxjs/Rx';

import { App } from './components/app';
import { NotificationService } from './shared/notification';
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
    TRANSLATE_PROVIDERS,
    provide(TranslateLoader, {
        useFactory: (appService: AppService) => new CustomTranslateLoader(appService),
        deps: [AppService]
    }),
    TranslateService,
    FORM_PROVIDERS,
    NotificationService,
    AppService,
    TaskService,
    ProjectService,
    ReferenceService,
    StaffService
]).catch(err => console.error(err));

//
class CustomTranslateLoader implements TranslateLoader {
    constructor(private appService: AppService) { }

    public getTranslation(lang: string): Observable<any> {
        return this.appService.getTranslations();
    }
}
