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

  public companyId: number = 1;
  public restaurants!: Restaurant[];

  public totalResults: number = 0;

  public currentCategory!: any;

  constructor(public categoriesService: CategoriesService, public restaurantService: RestaurantService, private activatedRoute: ActivatedRoute, public router: Router) {}

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.getRestaurantsByCategory(params['id']);
      this.getCategory(params['id']);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getCategory(categoryId: number) {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.currentCategory = categories.find((category) => {
        return category.id === (Number(categoryId));
      });
    });
  }

  public getRestaurantsByCategory(categoryId: number) {
    this.restaurantService.getRestaurants(this.companyId).subscribe((restaurants) => {
      this.restaurants = restaurants.filter((restaurant) => {
        return restaurant.categoryId.includes(Number(categoryId));
      });

      this.totalResults = this.restaurants.length;
    });
  }

  public onReturn() {
    this.router.navigate(['/categories']);
  }
}
