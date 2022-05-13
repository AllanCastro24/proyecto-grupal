import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { CartOverviewComponent } from 'src/app/shared/cart-overview/cart-overview.component';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { UsersService } from 'src/app/users/users.service';
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
  public menuFixed: boolean = false;

  public showSearch: boolean = false;
  public showClear: boolean = false;

  public searchResultsMenu: Menu[] = [];
  public searchResultsPlate: Plate[] = [];

  public favoriteIcon: string = 'favorite_border';

  @ViewChild('inputSearch') inputSearch!: ElementRef;

  constructor(
    public appService: AppService,
    public menuService: MenuService,
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    private categoriesService: CategoriesService,
    private usersService: UsersService
  ) {}

  async ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.restaurantId = params['id'];
    });

    this.menuService.toggleMenu(false);

    await this.getRestaurant();
    this.getCategories();
    this.getPlates();
    this.getMenu();
    this.checkFavorite();
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
    return new Promise((resolve, reject) => {
      this.restaurantService.getRestaurants().subscribe((restaurants) => {
        for (const restaurant of restaurants) {
          if (restaurant.id === this.restaurantId) {
            this.restaurant = restaurant;

            console.log(this.restaurant);
          }
        }

        resolve(true);
      });
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

  public openSearch() {
    this.showSearch = !this.showSearch;
  }

  public closeSearchResults() {
    this.showSearch = false;
  }

  public onInput(event: any) {
    this.showClear = event.target.value.length > 0;

    this.searchResultsMenu = [];
    this.searchResultsPlate = [];

    const value = this.inputSearch.nativeElement.value;

    if (!value) {
      return;
    }

    for (const plate of this.plates) {
      const name = plate.name.toLowerCase();
      const description = plate.description.toLowerCase();

      if (name.includes(value) || description.includes(value)) {
        const index = this.menu.findIndex((menu) => menu.id == plate.menuId);

        if (index === -1) {
          continue;
        }

        if (!this.searchResultsMenu.includes(this.menu[index])) {
          this.searchResultsMenu.push(this.menu[index]);
        }

        this.searchResultsPlate.push(plate);
      }
    }
  }

  public onClear() {
    this.showClear = false;

    this.searchResultsMenu = [];
    this.searchResultsPlate = [];

    this.inputSearch.nativeElement.value = '';
    this.inputSearch.nativeElement.focus();
  }

  public checkFavorite() {
    const favorites = this.usersService.getUser().favoriteRestaurants;
    
    if (favorites && favorites.find((restaurant) => restaurant.id === this.restaurant.id)) {
      this.favoriteIcon = 'favorite';
    }
  }

  public openCart() {
    this.appService.openCart(CartOverviewComponent);
  }

  @HostListener('window:scroll') onWindowScroll() {
    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);

    const topMenu = document.querySelector('.header');

    if (!topMenu) {
      return;
    }

    if (scrollTop >= topMenu.clientHeight) {
      this.menuFixed = true;
    } else {
      if (!document.documentElement.classList.contains('cdk-global-scrollblock')) {
        this.menuFixed = false;
      }
    }
  }

  public addToFavorites() {
    const status = this.restaurantService.addToFavorites(this.restaurant);

    this.favoriteIcon = status ? 'favorite' : 'favorite_border';
  }

  public onReturn() {
    this.menuService.toggleMenu(true);

    this._location.back();
  }
}
