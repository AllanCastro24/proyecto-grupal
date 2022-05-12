import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { CartOverviewComponent } from 'src/app/shared/cart-overview/cart-overview.component';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { Category } from '../../categories/categories';
import { CategoriesService } from '../../categories/categories.service';
import { Plate } from '../plates';
import { RestaurantService } from '../restaurant.service';
import { Menu, Restaurant } from '../restaurants';

@Component({
  selector: 'app-restaurant-single',
  templateUrl: './restaurant-single.component.html',
  styleUrls: ['./restaurant-single.component.scss'],
})
export class RestaurantSingleComponent implements OnInit {
  private sub: any;

  private restaurantId!: number;

  public restaurant!: Restaurant;
  public menu!: Menu[];
  public plates!: Plate[];
  public categories: Category[] = [];

  public currentMenu: number = 1;

  constructor(public appService: AppService, public menuService: MenuService, private _location: Location, private activatedRoute: ActivatedRoute, private restaurantService: RestaurantService, public categoriesService: CategoriesService) {}

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.restaurantId = params['id'];
    });

    this.menuService.toggleMenu(false);

    this.getRestaurant();
    this.getCategories();
    this.getPlates();
    this.getMenu();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getPlates() {
    this.restaurantService.getPlates(this.restaurantId).subscribe((plates) => {
      this.plates = plates;

      console.log(this.plates);
    });
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

  public async getCategories() {
    const categories: any = await this.categoriesService.getCategories().toPromise();

    for (const category of categories) {
      if (this.restaurant.categoryId.includes(category.id)) {
        this.categories.push(category);
      }
    }
  }

  public getMenu() {
    this.restaurantService.getMenu(this.restaurantId).subscribe((menu) => {
      this.menu = menu;

      console.log(menu);
    });
  }

  public onClickMenu(menu: Menu) {
    this.currentMenu = menu.id;

    let el: any = document.getElementById('restaurant-menu-' + menu.id);
    el.scrollIntoView({ behavior: 'smooth' });
  }

  public scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  public openCart() {
    this.appService.openCart(CartOverviewComponent);
  }

  public onReturn() {
    this.menuService.toggleMenu(true);

    this._location.back();
  }
}
