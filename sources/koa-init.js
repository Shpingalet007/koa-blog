import Koa from 'koa';
import nconf from 'nconf';
import KoaBodyParser from 'koa-bodyparser';
import bouncer from 'koa-bouncer';
import jsonAnswer from './middleware/json-answer';

// Config file capture
nconf.file({ file: './config/config.json' });

const app = new Koa();

app.use(KoaBodyParser());
app.use(bouncer.middleware());

import {routes, allowedMethods} from './middleware/router';

app.use(async (ctx, next) => {
    try {
        await next();
    } catch(err) {
        if (err instanceof bouncer.ValidationError) {
            console.log(err);
            return jsonAnswer.error(ctx, 500, 'Invalid params', err.bouncer);
        }
        throw err;
    }
});

app.use(routes());
app.use(allowedMethods());

// Tell console about server successfull start //
const name = nconf.get('app:name');
const port = nconf.get('app:port');

app.listen(nconf.get('app:port'), function () {
    console.log('%s listening at port %d', name, port);
});