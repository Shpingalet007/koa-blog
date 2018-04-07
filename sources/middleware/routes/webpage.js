import 'babel-polyfill';

import send from 'koa-send';
//import koaStatic from 'koa-static';

const path = require('path');
const appDir = path.dirname(require.main.filename);

const stylesDir = String.raw `${appDir}/sources/public/styles`;
const viewsDir = String.raw `${appDir}/sources/public/views`;

function WebpageRoutes([router]) {
    return router
        .get('/', async (ctx, next) => {
            await send(ctx, 'index.html', { root: viewsDir });
        })
        .get('/styles/:stylePath*', async (ctx, next) => {
            await send(ctx, ctx.params.stylePath, { root: stylesDir });

            //ctx.body = ctx.params.stylePath;
        })
}

module.exports = WebpageRoutes;