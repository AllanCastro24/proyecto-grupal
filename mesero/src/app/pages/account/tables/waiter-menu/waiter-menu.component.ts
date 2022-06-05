import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Plate } from 'src/app/pages/restaurants/plates';
import { RestaurantService } from 'src/app/pages/restaurants/restaurant.service';
import { Menu, Restaurant } from 'src/app/pages/restaurants/restaurants';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { WaiterService } from './waiter.service';

@Component({
  selector: 'app-waiter-menu',
  templateUrl: './waiter-menu.component.html',
  styleUrls: ['./waiter-menu.component.scss'],
})
export class WaiterMenuComponent implements OnInit {
  private sub: any;

  public tableId!: number;
  public restaurantId!: number;
  public companyId!: number;

  public restaurant!: Restaurant;
  public menu!: Menu[];
  public plates!: Plate[];

  public currentMenu: number = 1;
  public menuFixed: boolean = false;

  public showSearch: boolean = false;
  public showClear: boolean = false;

  public searchResultsMenu: Menu[] = [];
  public searchResultsPlate: Plate[] = [];

  public showCart: boolean = false;
  public tableItems: Plate[] = [];

  public showEditCart: boolean = false;
  public currentPlate!: Plate;
  public currentPlateTotal: number = 0;
  public quantityCount: number = 1;

  public totalItems: number = 0;
  public totalPrice: number = 0;

  @ViewChild('inputSearch') inputSearch!: ElementRef;

  constructor(
    public appService: AppService,
    public menuService: MenuService,
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    public restaurantService: RestaurantService,
    public router: Router,
    private snackBar: MatSnackBar,
    private waiterService: WaiterService
  ) {}

  async ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.restaurantId = params['id'];
      this.companyId = params['companyId'];
      this.tableId = params['tableId'];
    });

    this.menuService.toggleMenu(false);

    await this.getRestaurant();
    this.getPlates();
    this.getMenu();
    this.getTableItems();

    this.updateTotals();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getPlates() {
    this.restaurantService.getPlates(this.companyId, this.restaurantId).subscribe((plates) => {
      this.plates = plates;

      console.log(this.plates);
    });
  }

  public getRestaurant() {
    return new Promise(async (resolve, reject) => {
      this.restaurant = await this.restaurantService.getRestaurant(this.companyId, this.restaurantId);

      resolve(true);
    });
  }

  public getMenu() {
    this.restaurantService.getMenu(this.companyId, this.restaurantId).subscribe((menu) => {
      this.menu = menu;

      console.log(menu);
    });
  }

  public getTableItems() {
    const tables = this.waiterService.getTables();

    this.tableItems = tables.find((table) => table.id == this.tableId)?.items || [];
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

    const value = this.inputSearch.nativeElement.value.toLowerCase();

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

  public onReturn() {
    this.menuService.toggleMenu(true);

    this._location.back();
  }

  public toggleMenu() {
    const menu: any = document.querySelectorAll('.header, .info, .delivery-type, .restaurant-menu, .view-cart');

    for (const item of menu) {
      item.style.display = item.style.display === 'none' ? '' : 'none';
    }
  }

  public toggleCart() {
    this.showCart = !this.showCart;
  }

  public clearCart() {
    this.tableItems.length = 0;

    this.waiterService.removeTableItems(this.tableId);

    this.updateTotals();
    this.toggleCart();
  }

  public editCartItem(item: Plate) {
    this.currentPlate = item;
    this.currentPlateTotal = item.availibilityCount;

    this.toggleAll();
  }

  public counterChange(count: number) {
    this.quantityCount = count;
    this.currentPlate.cartCount = count;
  }

  public updateCart() {
    if (this.currentPlate.cartCount > this.currentPlate.availibilityCount) {
      this.quantityCount = 1;

      this.currentPlate.cartCount = this.currentPlate.availibilityCount;

      this.snackBar.open('No hay suficientes platillos, total: ' + this.currentPlate.availibilityCount, '', {
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['error'],
      });
    } else {
      this.waiterService.addTableItem(this.tableId, this.currentPlate);

      this.getTableItems();
      this.toggleAll();
    }
  }

  public deleteItem() {
    const index = this.tableItems.findIndex((table) => table.id == this.currentPlate.id);

    this.tableItems.splice(index, 1);

    this.waiterService.updateTableItems(this.tableId, this.tableItems);

    this.updateTotals();

    if (!this.tableItems.length) {
      this.clearCart();
    }

    this.toggleAll();
  }

  public updateTotals() {
    this.totalPrice = 0;
    this.totalItems = 0;

    for (const item of this.tableItems) {
      this.totalPrice += item.price * item.cartCount;
      this.totalItems += item.cartCount;
    }
  }

  public toggleEditCart() {
    this.showEditCart = !this.showEditCart;
    this.quantityCount = this.currentPlate.cartCount;
  }

  public toggleAll() {
    this.toggleCart();
    this.toggleMenu();
    this.toggleEditCart();
  }
}
