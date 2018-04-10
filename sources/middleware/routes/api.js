import 'babel-polyfill';

import jsonAnswer from '../json-answer';
import db from '../../middleware/mongoose';

function APIRoutes(router) {
    return router
        .get('/api/articles/:category*/list', async (ctx, next) => {
            //Validating input data
            ctx.validateParam('category')
                .optional()
                .isString('Invalid category');
            ctx.validateQuery('limit')
                .optional()
                .toInt('Limit is not integer');

            let data = await db.Article.find({ parentId: ctx.params.category, active: true }, {
                _id: 0,
                title: 1,
                text: 1,
                date: 1,
                author: 1
            }).exec();

            if(data) jsonAnswer.success(ctx, data);
            else jsonAnswer.error(ctx);
        })
        .get('/api/article/:id', async (ctx, next) => {
            //Validating input data
            ctx.validateParam('id')
                .optional()
                .isString('Invalid article ID');

            let data = await db.Article.findOne({ shortId: ctx.params.id }).exec();

            if(data) jsonAnswer.success(ctx, data);
            else jsonAnswer.error(ctx);
        })
        .put('/api/article/:id/unpublish', async (ctx, next) => {
            let query = { shortId: ctx.params.id };

            let check = await db.ArticleUpdate(query, { active : false });

            if(check) jsonAnswer.success(ctx);
            else jsonAnswer.error(ctx);
        })
        .put('/api/article/:id/publish', async (ctx, next) => {
            let query = { shortId: ctx.params.id };

            let check = await db.ArticleUpdate(query, { active : true });

            if(check) jsonAnswer.success(ctx);
            else jsonAnswer.error(ctx);
        })
        .put('/api/article/:id', async (ctx, next) => {
            //Validating input data
            ctx.validateBody('title').optional()
                .isString('Provide title').isLength(10,150, 'Title must be from 10 to 150 chars');
            ctx.validateBody('text').optional()
                .isString('Provide text');
            ctx.validateBody('image').optional()
                .isString('Article must have main image. Pass image name in uploads dir');
            ctx.validateBody('author').optional()
                .isString('Provide author name');
            ctx.validateBody('category').optional()
                .isString('Provide category ID');

            let data = {};
            if(ctx.request.body.title) data.title = ctx.request.body.title;
            if(ctx.request.body.image) data.image = ctx.request.body.image;
            if(ctx.request.body.text) data.text = ctx.request.body.text;
            if(ctx.request.body.author) data.author = ctx.request.body.author;
            if(ctx.request.body.category) data.parentId = ctx.request.body.category;

            let query = { shortId: ctx.params.id };

            let check = await db.ArticleUpdate(query, data);

            console.log(check);

            if(check) jsonAnswer.success(ctx);
            else jsonAnswer.error(ctx);
        })
        .del('/api/article/:id', async (ctx, next) => {
            //Validating input data
            ctx.validateParam('id')
                .isString('Invalid article ID');

            let check = await db.Article.find({ shortId:ctx.params.id }).remove().exec();

            if(check) jsonAnswer.success(ctx);
            else jsonAnswer.error(ctx);
        })
        .post('/api/article/create', async (ctx, next) => {
            // Validating input data
            ctx.validateBody('title')
                .isString('Provide title').isLength(10,150, 'Title must be from 10 to 150 chars');
            ctx.validateBody('text')
                .isString('Provide text');
            ctx.validateBody('image')
                .isString('Article must have main image. Pass image name in uploads dir');
            ctx.validateBody('author')
                .isString('Provide author name');
            ctx.validateBody('category')
                .isString('Provide category ID');

            let article = new db.Article({
                title: ctx.request.body.title,
                image: ctx.request.body.image,
                author: ctx.request.body.author,
                parentId: ctx.request.body.category,
                text: ctx.request.body.text
            });
            let check = await article.checkAndSave();

            if(check) jsonAnswer.success(ctx);
            else jsonAnswer.error(ctx);
        })
        .post('/api/comment/add', async (ctx, next) => {
            // Validating input data
            ctx.validateBody('text')
                .isString('Provide text');
            ctx.validateBody('author')
                .isString('Provide author name');
            ctx.validateBody('article')
                .isString('Provide article ID');

            let comment = new db.Comment({
                text: ctx.request.body.text,
                author: ctx.request.body.author,
                articleId: ctx.request.body.article
            });
            let check = await comment.checkAndSave();

            if(check) jsonAnswer.success(ctx);
            else jsonAnswer.error(ctx);
        })
        .post('/api/category/add', async (ctx, next) => {
            // Validating input data
            ctx.validateBody('urlName')
                .isString('Provide url name');
            ctx.validateBody('name')
                .isString('Provide category name');

            let category = new db.Category({
                urlTitle: ctx.request.body.urlName,
                title: ctx.request.body.name
            });
            category.generateId();
            category.save();
        });
}

module.exports = APIRoutes;