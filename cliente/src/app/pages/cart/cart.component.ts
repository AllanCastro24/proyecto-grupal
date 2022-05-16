import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { UsersService } from 'src/app/users/users.service';
import { Plate } from '../restaurants/plates';
import { RestaurantService } from '../restaurants/restaurant.service';
import { CartList } from '../restaurants/restaurants';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public cartsList: CartList[] = [];

  public restaurantId!: number;
  public companyId!: number;

  public showCart: boolean = false;
  public cartItems: Plate[] = [];

  public showEditCart: boolean = false;
  public currentPlate!: Plate;
  public currentPlateTotal: number = 0;
  public quantityCount: number = 1;

  constructor(
    public usersService: UsersService,
    public restaurantService: RestaurantService,
    public menuService: MenuService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.menuService.toggleMenu(true);

    this.getCartList();
  }

  public getCartList() {
    this.cartsList = this.usersService.getUser().cartList || [];
  }

  public getTotalItems(items: Plate[]): number {
    return items.reduce((prev, curr) => prev + curr.cartCount, 0);
  }

  public getTotalPrice(items: Plate[]): number {
    return items.reduce((prev, curr) => prev + curr.cartCount * curr.price, 0);
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
      const items = this.restaurantService.getCartList(this.restaurantId, this.companyId);
      const indexPlate = items.findIndex((data) => data.id == this.currentPlate.id);

      if (indexPlate !== -1) {
        items[indexPlate] = this.currentPlate;

        this.restaurantService.setCartList(this.restaurantId, this.companyId, items);
        this.cartItems = items;

        this.restaurantService.calculateCartTotal(this.restaurantId, this.companyId);

        this.getCartList();
        this.toggleAll();
      }

      console.log(this.restaurantService.getCartList(this.restaurantId, this.companyId), this.currentPlate);
    }
  }

  public deleteItem() {
    const items = this.restaurantService.getCartList(this.restaurantId, this.companyId);
    const index = items.findIndex((data) => data.id == this.currentPlate.id);

    items.splice(index, 1);

    if (items.length === 0) {
      this.clearCart();
      this.toggleAll();
      return;
    }

    this.restaurantService.setCartList(this.restaurantId, this.companyId, items);
    this.cartItems = items;

    this.restaurantService.calculateCartTotal(this.restaurantId, this.companyId);

    this.getCartList();
    this.toggleAll();
  }

  public toggleMenu() {
    const menu: any = document.querySelectorAll('.cartsList');

    for (const item of menu) {
      item.style.display = item.style.display === 'none' ? '' : 'none';
    }
  }

  public toggleCart() {
    this.showCart = !this.showCart;
  }

  public clearCart() {
    this.cartItems.length = 0;

    this.restaurantService.removeCartList(this.restaurantId, this.companyId);
    this.restaurantService.totalPrice = 0;

    this.restaurantService.calculateCartTotal(this.restaurantId, this.companyId);

    this.getCartList();
    this.toggleCart();
  }

  public editCartItem(item: Plate) {
    this.currentPlate = item;
    this.currentPlateTotal = item.availibilityCount;

    this.toggleAll();
  }

  public toggleEditCart() {
    this.showEditCart = !this.showEditCart;
    this.quantityCount = this.currentPlate.cartCount;
  }

  public openCartList(cartList: CartList) {
    console.log(cartList);

    this.restaurantId = cartList.branchId;
    this.companyId = cartList.companyId;

    this.cartItems = cartList.items;

    this.restaurantService.calculateCartTotal(this.restaurantId, this.companyId);

    this.toggleCart();
  }

  public toggleAll() {
    this.toggleCart();
    this.toggleMenu();
    this.toggleEditCart();
  }
}
