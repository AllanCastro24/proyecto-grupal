import { Component, OnInit } from '@angular/core';
import { Plate } from '../../restaurants/plates';
import { RestaurantService } from '../../restaurants/restaurant.service';

@Component({
  selector: 'app-frequent-plates',
  templateUrl: './frequent-plates.component.html',
  styleUrls: ['./frequent-plates.component.scss'],
})
export class FrequentPlatesComponent implements OnInit {
  public plates: Plate[] = [];

  constructor(public restaurantsService: RestaurantService) {}

  ngOnInit(): void {
    this.getPlates();
  }

  public getPlates() {
    for (let i = 0; i < 10; i++) {
      const rand = Math.floor(Math.random() * (34 - 1) + 1);

      this.restaurantsService.getPlate(rand).subscribe((plate) => {
        this.plates.push(plate);
      });
    }
  }
}
