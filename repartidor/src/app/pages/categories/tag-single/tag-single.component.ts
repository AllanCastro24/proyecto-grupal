import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../restaurants/restaurant.service';
import { Restaurant } from '../../restaurants/restaurants';
import { Tag } from '../categories';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-tag-single',
  templateUrl: './tag-single.component.html',
  styleUrls: ['./tag-single.component.scss'],
})
export class TagSingleComponent implements OnInit {
  private sub: any;

  public tags: Tag[] = [];
  public tagId!: number;
  public currentTag!: Tag;

  public companyId: number = 1;
  public totalCompany: number = 1;

  public restaurants: Restaurant[] = [];

  public totalResults: number = 0;

  constructor(
    public categoriesService: CategoriesService,
    public restaurantService: RestaurantService,
    public restaurantsService: RestaurantService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.getRestaurantsByTag(params['id']);
      this.tagId = params['id'];
    });

    this.getTags();
    this.getTag();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public async getTags() {
    this.tags = (await this.categoriesService.getTags().toPromise()) || [];
  }

  public getTag() {
    return this.tags.find((tag) => tag.id == this.tagId);
  }

  public async getRestaurantsByTag(id: number) {
    for (let i = 0; i < this.totalCompany; i++) {
      const restaurants = (await this.restaurantsService.getRestaurants(i + 1).toPromise()) || [];

      for (const restaurant of restaurants) {
        const hasTag = restaurant.tagId.find((tagId) => tagId == id);

        if (hasTag) {
          this.restaurants = [...this.restaurants, restaurant];
        }
      }
    }

    this.totalResults = this.restaurants.length;
  }

  public onReturn() {
    this.router.navigate(['/categories']);
  }
}
