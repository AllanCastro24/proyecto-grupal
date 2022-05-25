import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category, Tag } from '../categories';
import { RestaurantService } from '../../restaurants/restaurant.service';
import { Restaurant } from '../../restaurants/restaurants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss'],
})
export class CategorySearchComponent implements OnInit {
  @ViewChild('inputSearch') inputSearch!: ElementRef;

  public status: string = 'search';

  public showClose: boolean = false;
  public showSuggestions: boolean = false;

  public categories: Category[] = [];
  public tags: Tag[] = [];
  public restaurants: Restaurant[] = [];

  public showSearch: boolean = false;

  public searchResultsRestaurants: Restaurant[] = [];
  public searchResultsTag: Tag[] = [];

  // TODO: getRestaurants() debería retornar todos los restaurantes de cualquier tipo,
  //       pero no hay BD para hacer esto.
  public totalCompany: number = 1;

  constructor(private categoriesService: CategoriesService, public restaurantsService: RestaurantService, public router: Router) {}

  ngOnInit() {
    this.getCategories();
    this.getRestaurants();
    this.getTags();
  }

  public getCategories() {
    this.categoriesService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  public async getTags() {
    this.tags = (await this.categoriesService.getTags().toPromise()) || [];
  }

  public async getRestaurants() {
    for (let i = 0; i < this.totalCompany; i++) {
      const restaurant = (await this.restaurantsService.getRestaurants(i + 1).toPromise()) || [];

      this.restaurants = [...this.restaurants, ...restaurant];
    }
  }

  public onSearch() {
    this.status = 'arrow_back';
    this.showSuggestions = true;

    document.body.style.overflow = 'hidden';
  }

  public onReturn() {
    this.status = 'search';
    this.showSuggestions = false;

    document.body.style.overflow = 'auto';

    this.onClose();
  }

  public onInput(event: any) {
    this.showClose = event.target.value.length > 0;

    this.searchResultsRestaurants = [];
    this.searchResultsTag = [];

    const value = this.inputSearch.nativeElement.value.toLowerCase();

    if (!value) {
      this.toggleSearch(false);

      return;
    }

    this.toggleSearch(true);

    const indexTag = this.tags.findIndex((tag) => tag.name.toLowerCase().includes(value));
    const tag = this.tags[indexTag];

    if (indexTag !== -1) {
      this.searchResultsTag.push(tag);
    }

    for (const restaurant of this.restaurants) {
      const name = restaurant.name.toLowerCase();
      const hasTagRestaurant = this.tags.find((tag) => restaurant.tagId.find((id) => id == tag.id && tag.name.toLowerCase().includes(value)));

      if (name.includes(value) || hasTagRestaurant) {
        this.searchResultsRestaurants.push(restaurant);
      }
    }

    console.log(this.searchResultsRestaurants, this.searchResultsTag);
  }

  public toggleSearch(input: boolean) {
    this.showSearch = input;
  }

  public openLink(link: any) {
    document.body.style.overflow = 'auto';

    this.router.navigate(link);
  }

  public onClose() {
    this.showClose = false;
    this.inputSearch.nativeElement.value = '';

    this.toggleSearch(false);

    this.searchResultsRestaurants = [];
    this.searchResultsTag = [];
  }
}
