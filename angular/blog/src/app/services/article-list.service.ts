import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ArticleListService {

  constructor(private http: HttpClient) { }

  public get(url) {
    return this.http.get('http://localhost:60820/api/values');
  }

}
