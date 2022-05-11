import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../restaurants/restaurant.service';
import { Restaurant } from '../../restaurants/restaurants';

@Component({
  selector: 'app-frequent-restaurants',
  templateUrl: './frequent-restaurants.component.html',
  styleUrls: ['./frequent-restaurants.component.scss']
})
export class FrequentRestaurantsComponent implements OnInit {
  public restaurants!: Restaurant[];

  constructor(public restaurantsService: RestaurantService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories() {
    this.restaurantsService.getFrequentRestaurants().subscribe((restaurants) => {
      this.restaurants = restaurants;
    });
  }
}
