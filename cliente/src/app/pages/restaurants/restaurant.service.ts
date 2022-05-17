import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/users/users.service';
import { environment } from 'src/environments/environment';
import { Plate } from './plates';
import { CartList, Menu, Order, Restaurant } from './restaurants';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  public totalPrice: number = 0;
  public totalCartCount: number = 0;
  public totalCartList: number = 0;

  public url = environment.url + '/assets/data/';

  constructor(public http: HttpClient, public usersService: UsersService) {}

  public async getRestaurant(companyId: number, id: number): Promise<Restaurant> {
    return new Promise((resolve, reject) => {
      this.getRestaurantsByCompany(companyId).subscribe((restaurants) => {
        for (const restaurant of restaurants) {
          if (restaurant.id == id) {
            resolve(restaurant);
          }
        }

        resolve(<Restaurant>{});
      });
    });
  }

  public getRestaurants(companyId: number): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.url}restaurants/${companyId}/restaurants.json`);
  }

  public getRestaurantsByCompany(companyId: number): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.url}restaurants/${companyId}/restaurants.json`);
  }

  public getFrequentRestaurants(companyId: number): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.url}restaurants/${companyId}/restaurants.json`);
  }

  public getPlate(companyId: number, restaurantId: number, id: number): Observable<Plate> {
    return this.http.get<Plate>(`${this.url}restaurants/${companyId}/${restaurantId}/plates/menu-item-${id}.json`);
  }

  public getPlates(companyId: number, restaurantId: number): Observable<Plate[]> {
    return this.http.get<Plate[]>(`${this.url}restaurants/${companyId}/${restaurantId}/plates/menu-items.json`);
  }

  public getMenu(companyId: number, restaurantId: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.url}restaurants/${companyId}/${restaurantId}/menu.json`);
  }

  public getFavorites(): Restaurant[] {
    return this.usersService.getUser().favoriteRestaurants || [];
  }

  public addToFavorites(restaurant: Restaurant): boolean {
    const user = this.usersService.getUser();

    if (!user.favoriteRestaurants) {
      user.favoriteRestaurants = [];
    }

    const index = user.favoriteRestaurants.findIndex((data) => data.companyId == restaurant.companyId && data.id == restaurant.id);

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

  public getCartList(branchId: number, companyId: number): Plate[] {
    const cartList = this.usersService.getUser().cartList || [];

    const indexCartList = cartList.findIndex((cartList) => cartList.branchId == branchId && cartList.companyId == companyId);

    if (indexCartList !== -1) {
      return cartList[indexCartList].items;
    }

    return [];
  }

  public setCartList(branchId: number, companyId: number, items: Plate[]) {
    const user = this.usersService.getUser();
    const cartList = user.cartList || [];
    const indexCartList = cartList.findIndex((cartList) => cartList.branchId == branchId && cartList.companyId == companyId);

    if (indexCartList !== -1) {
      cartList[indexCartList].items = items;
    }

    user.cartList = cartList;

    this.usersService.setUser(user);
  }

  public removeCartList(branchId: number, companyId: number) {
    const user = this.usersService.getUser();
    const cartList = user.cartList || [];
    const indexCartList = cartList.findIndex((cartList) => cartList.branchId == branchId && cartList.companyId == companyId);

    if (indexCartList !== -1) {
      cartList.splice(indexCartList, 1);

      user.cartList = cartList;

      this.usersService.setUser(user);
    }
  }

  public async addToCart(plate: Plate) {
    const user = this.usersService.getUser();

    if (!user.cartList) {
      user.cartList = [];
    }

    const indexCartList = user.cartList.findIndex((cartList) => cartList.branchId == plate.branchId && cartList.companyId == plate.companyId);

    if (indexCartList === -1) {
      const restaurant = await this.getRestaurant(plate.companyId, plate.branchId);

      const cartList: CartList = {
        id: user.cartList.length + 1,
        name: restaurant.name,
        image: plate.image.medium,
        branchId: plate.branchId,
        companyId: plate.companyId,
        items: [plate],
      };

      user.cartList.push(cartList);

      this.usersService.setUser(user);
    } else {
      const index = user.cartList[indexCartList].items.findIndex((data) => data.id == plate.id);

      if (index === -1) {
        user.cartList[indexCartList].items.push(plate);

        this.usersService.setUser(user);

        this.calculateCartTotal(plate.branchId, plate.companyId);
      }
    }

    console.log(this.usersService.getUser(), plate);
  }

  public calculateCartTotal(branchId: number, companyId: number) {
    this.totalPrice = 0;
    this.totalCartCount = 0;

    const items = this.getCartList(branchId, companyId);

    for (const item of items) {
      this.totalPrice += item.price * item.cartCount;
      this.totalCartCount += item.cartCount;
    }

    this.calculateCartListTotal();
  }

  public calculateCartListTotal() {
    this.totalCartList = 0;
    this.totalCartList = (this.usersService.getUser().cartList || []).length;
  }

  public getOrders() {
    return this.usersService.getUser().orderList || [];
  }

  public addOrder(order: Order) {
    const user = this.usersService.getUser();

    if (!user.orderList) {
      user.orderList = [];
    }

    user.orderList.push(order);

    this.usersService.setUser(user);
    
  }
}
