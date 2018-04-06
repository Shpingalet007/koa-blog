import 'babel-polyfill';

import KoaBody from 'koa-body';
import convert from 'koa-convert';
import Router from 'koa-router'

const koaBody = convert(KoaBody());
const router = new Router;

router
    .get('/articles/:category*/list', async (ctx, next) => {
        // Blog post list for specific category
        ctx.checkQuery('limit', 'Invalid limit param').optional().isInt({min: 5, max: 20});

        return ctx.getValidationResult().then(function(result) {
            ctx.body = ctx.params.category ? ctx.params.category : 'NO PARAM'
        });
    })
    .get('/product', async (ctx, next) => {
        ctx.body = '123'
    })
    .get('/product/:id', async (ctx, next) => {
        let result = 'product/' + ctx.params.id;
        if (result) {
            ctx.body = result
        } else {
            ctx.status = 204
        }
    })
    .post('/product', koaBody, async (ctx, next) => {
        ctx.status = 201;
        ctx.body = await product.create(ctx.request.body)
    })
    .put('/product/:id', koaBody, async (ctx, next) => {
        ctx.status = 204;
        await product.update(ctx.params.id, ctx.request.body);
    })
    .delete('/product/:id', async (ctx, next) => {
        ctx.status = 204;
        await product.delete(ctx.params.id);
    });

export function routes () { return router.routes() }
export function allowedMethods () { return router.allowedMethods() }