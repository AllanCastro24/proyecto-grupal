import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plate } from '../plates';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.scss'],
})
export class PlateComponent implements OnInit {
  private sub: any;

  public restaurantId!: number;
  public plateId!: number;

  public quantityCount: number = 1;
  public price: number = 100;

  public plate!: Plate;

  constructor(private _location: Location, private activatedRoute: ActivatedRoute, private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.restaurantId = params['restaurantId'];
      this.plateId = params['plateId'];
    });

    this.getPlate();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getPlate() {
    this.restaurantService.getPlate(this.restaurantId, this.plateId).subscribe((plate) => {
      this.plate = plate;

      console.log(this.plate);
    });
  }

  public counterChange(count: number) {
    this.quantityCount = count;
  }

  public onReturn() {
    this._location.back();
  }
}
