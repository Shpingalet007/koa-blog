class RestAPI {
    buildUrl(path) {
        const host = 'http://localhost:4020/api';

        return host + path;
    }
    getArticlesList(categoryId) {
        const path = String.raw`/articles/${categoryId}/list`;

        return $.get({
            url: this.buildUrl(path);
        });
    }
}