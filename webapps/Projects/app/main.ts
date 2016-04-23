import {bootstrap} from 'angular2/platform/browser';
import {provide, enableProdMode} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    LocationStrategy,
    HashLocationStrategy
} from 'angular2/router';

import {createStore} from 'redux';

import {App} from './components/app';
import {TaskActions} from './actions/task';
import {ProjectActions} from './actions/project';
import rootReducer from './reducers/index';

const appStore = createStore(rootReducer);

declare let __PRODUCTION__: any;
if (__PRODUCTION__) {
    enableProdMode();
}

bootstrap(App, [
    provide('AppStore', { useValue: appStore }),
    HTTP_PROVIDERS,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    TaskActions,
    ProjectActions
]).catch(err => console.error(err));
