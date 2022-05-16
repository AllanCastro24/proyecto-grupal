import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { UsersService } from 'src/app/users/users.service';
import { AccountService } from '../account/account.service';
import { Plate } from '../restaurants/plates';
import { RestaurantService } from '../restaurants/restaurant.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  private sub: any;

  public restaurantId!: number;
  public companyId!: number;

  public cartItems: Plate[] = [];

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    public usersService: UsersService,
    public restaurantService: RestaurantService,
    public menuService: MenuService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.restaurantId = params['id'];
      this.companyId = params['companyId'];
    });

    this.menuService.toggleMenu(false);

    this.getCartList();

    console.log(this.cartItems, this.restaurantId, this.companyId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getCartList() {
    this.cartItems = this.restaurantService.getCartList(this.restaurantId, this.companyId);
  }

  public onReturn() {
    this._location.back();
  }
}
