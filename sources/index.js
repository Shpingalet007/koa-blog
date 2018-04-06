import Koa from 'koa';
import KoaBodyParser from 'koa-bodyparser';
import KoaValidator from 'koa2-validator';

const app = new Koa();

app.use(KoaBodyParser());
app.use(KoaValidator());

import {routes, allowedMethods} from './middleware/routes.js';

app.use(routes());
app.use(allowedMethods());



// Tell console about server successfull start //
const nconf = _.conf;

const name = nconf.get('app:name');
const port = nconf.get('app:port');

app.listen(nconf.get('app:port'), function () {
    console.log('%s listening at port %d', name, port);
});