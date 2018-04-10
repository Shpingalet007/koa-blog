import { Article } from './article';
import { ArticleListService } from './services/article-list.service';

const HOST = 'http://localhost:4020/api';
const articlesList = '/articles/cv4lg3/list';

let articles = (new ArticleListService()).get('http://anyurl.com');

export const ARTICLES: Article[] = articles.data;
