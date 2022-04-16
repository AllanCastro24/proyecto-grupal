import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.scss'],
})
export class RestaurantInfoComponent implements OnInit {
  private sub: any;

  public restaurant_id!: number;

  constructor(private _location: Location, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.restaurant_id = params['id'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public onReturn() {
    this._location.back();
  }
}
