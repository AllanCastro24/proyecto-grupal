import { Component, OnInit, ViewChild, HostListener, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../restaurants/restaurant.service';
import { Restaurant } from '../../restaurants/restaurants';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-category-single',
  templateUrl: './category-single.component.html',
  styleUrls: ['./category-single.component.scss'],
})
export class CategorySingleComponent implements OnInit {
  private sub: any;

  public categoryId!: number;
  public restaurants: Restaurant[] = [];

  public totalResults: number = 0;

  public currentCategory!: any;

  constructor(
    public categoriesService: CategoriesService,
    public restaurantService: RestaurantService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.categoryId = Number(params.id);

      this.getCategory();
      this.getRestaurantsByCategory();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getCategory() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.currentCategory = categories.find((category) => {
        return category.id === this.categoryId;
      });
    });
  }

  public async getRestaurantsByCategory() {
    const companies = await this.restaurantService.getCompanies();

    for (const company of companies) {
      const restaurants = (await this.restaurantService.getRestaurantsByCompany(company.id)) || [];
      const filteredRestaurants = restaurants.filter((restaurant) => {
        return restaurant.categoryId.includes(this.categoryId);
      });

      this.restaurants = [...this.restaurants, ...filteredRestaurants];
    }

    this.totalResults = this.restaurants.length;
  }

  public onReturn() {
    this.router.navigate(['/categories']);
  }
}
