import 'babel-polyfill';

import jsonAnswer from '../json-answer';

function APIRoutes([router]) {
    return router
        .get('/articles/:category*/list', async (ctx, next) => {
            //Validating input data
            ctx.validateParam('category')
                .optional()
                .isString('Invalid category');
            ctx.validateQuery('limit')
                .optional()
                .toInt('Not integer');

            // TODO: Place here DB query
            // let categoriesList = ... ;

            ctx.body = jsonAnswer.success(categoriesList);
        })
        .get('/article/:id', async (ctx, next) => {
            //Validating input data
            ctx.validateParam('id')
                .optional()
                .isString('Invalid article ID');

            // TODO: Place here DB query
            // let articleData = ... ;

            ctx.body = jsonAnswer.success(articleData);
        })
        .put('/article/:id', async (ctx, next) => {
            //Validating input data
            ctx.validateParam('id')
                .optional()
                .isString('Invalid article ID');

            // TODO: Place here DB query

            ctx.body = jsonAnswer.success();
        })
        .del('/article/:id', async (ctx, next) => {
            //Validating input data
            ctx.validateParam('id')
                .optional()
                .isString('Invalid article ID');

            // TODO: Place here DB query

            ctx.body = jsonAnswer.success();
        })
        .post('/article/create', async (ctx, next) => {
            //Validating input data
            // TODO: Validations...

            // TODO: Place here DB query

            ctx.body = jsonAnswer.success();
        })
        .post('/comment/add', async (ctx, next) => {
            // Validating input data
            // TODO: Validations...

            // TODO: Place here DB query

            ctx.body = jsonAnswer.success();
        })
}

module.exports = APIRoutes;