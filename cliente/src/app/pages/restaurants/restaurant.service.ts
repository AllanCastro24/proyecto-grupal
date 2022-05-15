import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/users/users.service';
import { environment } from 'src/environments/environment';
import { Plate } from './plates';
import { Menu, Restaurant } from './restaurants';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  public totalPrice: number = 0;
  public totalCartCount: number = 0;

  public url = environment.url + '/assets/data/';

  constructor(public http: HttpClient, public usersService: UsersService) {}

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

  public addToFavorites(restaurant: Restaurant): boolean {
    const user = this.usersService.getUser();

    if (!user.favoriteRestaurants) {
      user.favoriteRestaurants = [];
    }

    const index = user.favoriteRestaurants.findIndex((data) => data.id === restaurant.id);

    let status = false;

    if (index === -1) {
      user.favoriteRestaurants.push(restaurant);
      status = true;
    } else {
      user.favoriteRestaurants.splice(index, 1);
    }

    this.usersService.setUser(user);

    console.log(this.usersService.getUser(), restaurant);

    return status;
  }

  get cartList(): Plate[] {
    return this.usersService.getUser().cartList || [];
  }

  set cartList(value: Plate[]) {
    const user = this.usersService.getUser();

    user.cartList = value;

    this.usersService.setUser(user);
  }

  public addToCart(plate: Plate): void {
    const user = this.usersService.getUser();

    if (!user.cartList) {
      user.cartList = [];
    }

    const index = user.cartList.findIndex((data) => data.id === plate.id);

    if (index === -1) {
      user.cartList.push(plate);

      this.usersService.setUser(user);

      this.calculateCartTotal();
    }

    console.log(this.usersService.getUser(), plate);
  }

  public calculateCartTotal() {
    this.totalPrice = 0;
    this.totalCartCount = 0;

    this.cartList.forEach((item) => {
      this.totalPrice += item.price * item.cartCount;
      this.totalCartCount += item.cartCount;
    });
  }
}
