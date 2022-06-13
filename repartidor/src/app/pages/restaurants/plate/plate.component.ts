import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { UsersService } from 'src/app/users/users.service';
import { Plate } from '../plates';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.scss'],
})
export class PlateComponent implements OnInit {
  private sub: any;

  public restaurantId!: number;
  public companyId!: number;
  public plateId!: number;

  public quantityCount: number = 1;
  public price: number = 100;

  public plate!: Plate;

  public note: string = '';

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    public menuService: MenuService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.restaurantId = params['id'];
      this.companyId = params['companyId'];
      this.plateId = params['plateId'];
    });

    this.menuService.toggleMenu(false);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public addToCart() {
    this.plate.cartCount = this.quantityCount;

    if (this.plate.cartCount <= this.plate.availibilityCount) {
      this.plate.note = this.note;

      const cartList = this.restaurantService.getCartList(this.plate.branchId, this.plate.companyId);
      const index: number = cartList.findIndex((item) => item.id == this.plate.id);

      if (index !== -1) {
        cartList[index] = this.plate;

        this.restaurantService.setCartList(this.plate.branchId, this.plate.companyId, cartList);
        this.restaurantService.calculateCartTotal(this.plate.branchId, this.plate.companyId);
      } else {
        this.restaurantService.addToCart(this.plate);
      }

      this.onReturn();
    } else {
      this.plate.cartCount = this.plate.availibilityCount;

      this.snackBar.open('No hay suficientes platillos, total: ' + this.plate.availibilityCount, '', {
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['error'],
      });
    }
  }

  public counterChange(count: number) {
    this.quantityCount = count;
  }

  public onReturn() {
    this._location.back();
  }
}
