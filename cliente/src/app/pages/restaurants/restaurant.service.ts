import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Restaurant } from './restaurants';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  public url = environment.url + '/assets/data/';

  constructor(public http: HttpClient) {}

  public getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url + 'restaurants.json');
  }
}
