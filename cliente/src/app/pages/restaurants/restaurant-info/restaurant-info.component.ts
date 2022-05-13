import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tag } from '../../categories/categories';
import { CategoriesService } from '../../categories/categories.service';
import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurants';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.scss'],
})
export class RestaurantInfoComponent implements OnInit {
  private sub: any;

  public restaurantId!: number;

  public restaurant!: Restaurant;
  public tags: Tag[] = [];

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    public categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.restaurantId = params['id'];
    });

    this.getRestaurant();
    this.getTags();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getRestaurant() {
    this.restaurantService.getRestaurants().subscribe((restaurants) => {
      for (const restaurant of restaurants) {
        if (restaurant.id === this.restaurantId) {
          this.restaurant = restaurant;

          console.log(this.restaurant);
        }
      }
    });
  }

  public async getTags() {
    const tags: any = await this.categoriesService.getTags().toPromise();

    for (const tag of tags) {
      if (this.restaurant.tagId.includes(Number(tag.id))) {
        this.tags.push(tag);

        this.tags.push({
          id: -1,
          name: '●',
        });
      }
    }

    this.tags.pop();
  }

  public openAddress(latitude: number, longitude: number) {
    Browser.open({
      url: `https://www.google.com/maps/@${latitude},${longitude},20z`,
    });
  }

  public onReturn() {
    this._location.back();
  }
}
