import 'babel-polyfill';

import Router from 'koa-router'

import WebpageRoutes from './routes/webpage';
import APIRoutes from './routes/api';

// Experimental reference variable
var router = [ new Router ];
WebpageRoutes(router);
APIRoutes(router);

// Returning to standart state
[router] = router;

export function routes() { return router.routes() }
export function allowedMethods() { return router.allowedMethods() }