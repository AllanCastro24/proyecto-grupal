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
  public companyId!: number;

  public restaurant!: Restaurant;
  public tags: Tag[] = [];

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    public categoriesService: CategoriesService
  ) {}

  async ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.restaurantId = params['id'];
      this.companyId = params['companyId'];
    });

    await this.getRestaurant();
    this.getTags();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public async getRestaurant() {
    this.restaurant = await this.restaurantService.getRestaurant(this.restaurantId, this.companyId);
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
