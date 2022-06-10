import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../restaurants/restaurant.service';
import { Restaurant } from '../../restaurants/restaurants';

@Component({
  selector: 'app-frequent-restaurants',
  templateUrl: './frequent-restaurants.component.html',
  styleUrls: ['./frequent-restaurants.component.scss'],
})
export class FrequentRestaurantsComponent implements OnInit {
  public restaurants!: Restaurant[];

  constructor(public restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.getRestaurants();
  }

  public async getRestaurants() {
    const restaurants: Restaurant[] = [];
    const promises: any = [];

    const companies = await this.restaurantService.getCompanies();

    for (const company of companies) {
      const restaurants = (await this.restaurantService.getRestaurantsByCompany(company.id)) || [];
      promises.push(restaurants);
    }

    for await (const promise of promises) {
      restaurants.push(...promise);
    }

    this.restaurants = restaurants;
  }
}
