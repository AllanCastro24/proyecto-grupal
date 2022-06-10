import { Component, OnInit } from '@angular/core';
import { Plate } from '../../restaurants/plates';
import { RestaurantService } from '../../restaurants/restaurant.service';
import { Restaurant } from '../../restaurants/restaurants';

@Component({
  selector: 'app-frequent-plates',
  templateUrl: './frequent-plates.component.html',
  styleUrls: ['./frequent-plates.component.scss'],
})
export class FrequentPlatesComponent implements OnInit {
  public plates: Plate[] = [];

  constructor(public restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.getPlates();
  }

  public async getPlates() {
    const restaurants: Restaurant[] = [];
    const plates: Plate[] = [];
    const promises: any = [];

    const companies = await this.restaurantService.getCompanies();

    for (const company of companies) {
      const restaurants = (await this.restaurantService.getRestaurantsByCompany(company.id)) || [];
      promises.push(restaurants);
    }

    for await (const promise of promises) {
      restaurants.push(...promise);
    }

    promises.length = 0;

    for (const restaurant of restaurants) {
      promises.push(this.restaurantService.getPlates(restaurant.id, restaurant.companyId));
    }

    for await (const promise of promises) {
      const platesList = promise as Plate[];
      const plate = platesList[this.rand(0, platesList.length - 1)] || [];
      const index = plates.findIndex((p) => p.companyId == plate.companyId && p.id == plate.id);

      if (index == -1) {
        plates.push(plate);
      }
    }

    this.plates = plates;
  }

  public rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
