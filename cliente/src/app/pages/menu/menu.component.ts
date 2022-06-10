import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories/categories.service';
import { Restaurant } from '../restaurants/restaurants';
import { RestaurantService } from '../restaurants/restaurant.service';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/theme/components/menu/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public restaurants: Restaurant[] = [];
  public favoritesRestaurants: Restaurant[] = [];

  constructor(
    public categoriesService: CategoriesService,
    public restaurantService: RestaurantService,
    public router: Router,
    public menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.menuService.toggleMenu(true);

    this.getRestaurants();
    this.getFavorites();
  }

  public async getRestaurants() {
    this.restaurants = [];

    const companies = await this.restaurantService.getCompanies();

    for (const company of companies) {
      const restaurants = (await this.restaurantService.getRestaurantsByCompany(company.id)) || [];

      this.restaurants = [...this.restaurants, ...restaurants];
    }
  }

  public getFavorites() {
    this.favoritesRestaurants = this.restaurantService.getFavorites();
  }

  public isFavorite(restaurant: Restaurant) {
    const index = this.favoritesRestaurants.findIndex((fav) => fav.companyId == restaurant.companyId && fav.id == restaurant.id);

    return index !== -1 ? 'favorite' : 'favorite_border';
  }

  public addToFavorites(restaurant: Restaurant, event: any) {
    event.target.textContent = this.restaurantService.addToFavorites(restaurant) ? 'favorite' : 'favorite_border';

    this.getFavorites();
    this.getRestaurants();
  }
}
