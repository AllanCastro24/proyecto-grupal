import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, Tag } from './categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public url = environment.url + '/assets/data/';

  constructor(public http: HttpClient) {}

  public getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(this.url + 'restaurants/categories.json');
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + 'restaurants/categories.json');
  }

  public getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.url + 'restaurants/tags.json');
  }
}
