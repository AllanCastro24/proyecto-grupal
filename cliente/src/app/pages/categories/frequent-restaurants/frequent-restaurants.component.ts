import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../restaurants/restaurant.service';
import { Restaurant } from '../../restaurants/restaurants';

@Component({
  selector: 'app-frequent-restaurants',
  templateUrl: './frequent-restaurants.component.html',
  styleUrls: ['./frequent-restaurants.component.scss']
})
export class FrequentRestaurantsComponent implements OnInit {
  public companyId: number = 1;
  public restaurants!: Restaurant[];

  constructor(public restaurantsService: RestaurantService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories() {
    this.restaurantsService.getFrequentRestaurants(this.companyId).subscribe((restaurants) => {
      this.restaurants = restaurants;
    });
  }
}
