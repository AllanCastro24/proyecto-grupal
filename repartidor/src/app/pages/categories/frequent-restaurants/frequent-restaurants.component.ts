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

    const totalCompanies = ((await this.restaurantService.getCompanies().toPromise()) || []).length;

    for (let i = 1; i <= totalCompanies; i++) {
      promises.push(this.restaurantService.getRestaurantsByCompany(i).toPromise());
    }

    for await (const promise of promises) {
      restaurants.push(...promise);
    }

    this.restaurants = restaurants;
  }
}
