import 'babel-polyfill';

import send from 'koa-send';
//import koaStatic from 'koa-static';

const path = require('path');
const appDir = path.dirname(require.main.filename);

const stylesDir = String.raw `${appDir}/sources/public/styles`;
const imagesDir = String.raw `${appDir}/sources/public/images`;
const viewsDir = String.raw `${appDir}/sources/public/views`;
const scriptsDir = String.raw `${appDir}/sources/public/scripts`;

function WebpageRoutes(router) {
    return router
        .get('/', async (ctx, next) => {
            await send(ctx, 'index.html', { root: viewsDir });
        })
        .get('/styles/:stylePath*', async (ctx, next) => {
            await send(ctx, ctx.params.stylePath, { root: stylesDir });
        })
        .get('/images/:imagePath*', async (ctx, next) => {
            await send(ctx, ctx.params.imagePath, { root: imagesDir });
        })
        .get('/scripts/:scriptPath*', async (ctx, next) => {
            await send(ctx, ctx.params.scriptPath, { root: scriptsDir });
        })
}

module.exports = WebpageRoutes;