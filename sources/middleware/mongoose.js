import mongoose from 'mongoose';
import crc32 from 'crc-32';
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/test');

function generateId(str) {
    let shortId = crc32.str(str);
    shortId = Math.abs(shortId).toString(32);

    return shortId;
}

const ArticleSchema = new Schema({
    shortId: {
        type: String,
        unique: true
    },
    title: String,
    author: String,
    date: {
        type: Date,
        default: Date.now
    },
    text: String,
    parentId: String,
    active: {
        type: Boolean,
        default: true
    }
});
ArticleSchema.methods.checkAndSave = async function() {
    let Article = this;

    this.shortId = generateId(this.title + Date.now());

    let promise = db.Category.count({shortId: this.parentId}).exec();

    return promise.then(function(exist) {
        if(!exist) return false;

        return Article.save();
    });
};
async function updateArticle(query, data) {
    try {
        return await db.Article.findOneAndUpdate(query, data);
    } catch(err) {
        return err;
    }
}

const CommentSchema = new Schema({
    shortId: {
        type: String,
        unique: true
    },
    text: String,
    author: String,
    articleId: String,
    active: {
        type: Boolean,
        default: true
    }
});
CommentSchema.methods.checkAndSave = async function() {
    let Comment = this;

    this.shortId = generateId(this.text + this.author + Date.now());

    console.log(this);
    let promise = db.Article.count({shortId: this.articleId}).exec();

    return promise.then(function(exist) {
        console.log(exist);
        if(!exist) return false;

        return Comment.save();
    });
};

const CategorySchema = new Schema({
    shortId: {
        type: String,
        unique: true
    },
    urlTitle: {
        type: String,
        unique: true
    },
    title: String,
    active: {
        type: Boolean,
        default: true
    }
});
CategorySchema.methods.generateId = function() {
    this.shortId = generateId(this.urlTitle);
};

const db = {
    Article: mongoose.model('Article', ArticleSchema),
    ArticleUpdate: updateArticle,
    Comment: mongoose.model('Comment', CommentSchema),
    Category: mongoose.model('Category', CategorySchema)
};


module.exports = db;