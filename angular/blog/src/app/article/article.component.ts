import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ARTICLES } from '../articles';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articles = ARTICLES;

  /*article: Article = {
    id: 1,
    title: 'Article #1',
    date: 'Sunday, 7 april 2018',
    image: 'image.jpg',
    short: 'TEXT...'
  };*/

  constructor() { }

  selectedArticle: Article;

  onSelect(article: Article): void {
    this.selectedArticle = article;
  }

  ngOnInit() {
  }

}
