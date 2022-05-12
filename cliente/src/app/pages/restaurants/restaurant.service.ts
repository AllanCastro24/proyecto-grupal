import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plate } from './plates';
import { Menu, Restaurant } from './restaurants';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  public url = environment.url + '/assets/data/';

  constructor(public http: HttpClient) {}

  public getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url + 'restaurants/restaurants.json');
  }

  public getFrequentRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url + 'restaurants/restaurants.json');
  }

  public getPlate(restaurantId: number, plateId: number): Observable<Plate> {
    return this.http.get<Plate>(`${this.url}restaurants/${restaurantId}/plates/menu-item-${plateId}.json`);
  }

  public getPlates(id: number): Observable<Plate[]> {
    return this.http.get<Plate[]>(`${this.url}restaurants/${id}/plates/menu-items.json`);
  }

  public getMenu(id: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.url}restaurants/${id}/menu.json`);
  }
}
