import 'babel-polyfill';

import Router from 'koa-router'

import WebpageRoutes from './routes/webpage';
import APIRoutes from './routes/api';

let router = new Router;
WebpageRoutes(router);
APIRoutes(router);


export function routes() { return router.routes() }
export function allowedMethods() { return router.allowedMethods() }