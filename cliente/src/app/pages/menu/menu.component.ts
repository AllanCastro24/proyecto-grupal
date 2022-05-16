import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories/categories.service';
import { Restaurant } from '../restaurants/restaurants';
import { RestaurantService } from '../restaurants/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public totalCompany: number = 1;

  public restaurants: Restaurant[] = [];
  public favoritesRestaurants: Restaurant[] = [];

  constructor(public categoriesService: CategoriesService, public restaurantService: RestaurantService, public router: Router) {}

  ngOnInit(): void {
    this.getRestaurants();
    this.getFavorites();
  }

  public async getRestaurants() {
    for (let i = 0; i < this.totalCompany; i++) {
      const restaurant = (await this.restaurantService.getRestaurants(i + 1).toPromise()) || [];

      this.restaurants = [...this.restaurants, ...restaurant];
    }
  }

  public getFavorites() {
    this.favoritesRestaurants = this.restaurantService.getFavorites();
  }

  public isFavorite(restaurant: Restaurant) {
    return this.favoritesRestaurants.find((fav) => fav.id == restaurant.id) ? 'favorite' : 'favorite_border';
  }

  public addToFavorites(restaurant: Restaurant, event: any) {
    event.target.textContent = this.restaurantService.addToFavorites(restaurant) ? 'favorite' : 'favorite_border';

    this.getFavorites();
  }
}
