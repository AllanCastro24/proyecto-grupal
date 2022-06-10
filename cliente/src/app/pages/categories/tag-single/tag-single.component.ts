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

  public restaurants: Restaurant[] = [];

  public totalResults: number = 0;

  constructor(
    public categoriesService: CategoriesService,
    public restaurantService: RestaurantService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  async ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.getRestaurantsByTag(params['id']);
      this.tagId = params['id'];
    });

    await this.getTags();
    this.getTag();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public async getTags() {
    this.tags = (await this.categoriesService.getTags().toPromise()) || [];
  }

  public getTag() {
    this.currentTag = this.tags.find((tag) => tag.id == this.tagId) || <Tag>{};
  }

  public async getRestaurantsByTag(id: number) {
    const companies = await this.restaurantService.getCompanies();

    for (const company of companies) {
      const restaurants = (await this.restaurantService.getRestaurantsByCompany(company.id)) || [];

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
