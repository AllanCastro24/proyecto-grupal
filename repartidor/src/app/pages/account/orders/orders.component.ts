import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderDetailsDialogComponent } from 'src/app/shared/order-details-dialog/order-details-dialog.component';
import { UsersService } from 'src/app/users/users.service';
import { Plate } from '../../restaurants/plates';
import { RestaurantService } from '../../restaurants/restaurant.service';
import { Order, Restaurant } from '../../restaurants/restaurants';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  public ordersList: Order[] = [];

  public restaurantId!: number;
  public companyId!: number;

  constructor(private accountService: AccountService, public restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.getOrdersList();
  }

  public getOrdersList() {
    this.ordersList = this.accountService.getOrders();
  }

  public getTotalItems(items: Plate[]): number {
    return items.reduce((prev, curr) => prev + curr.cartCount, 0);
  }

  public getTotalPrice(items: Plate[]): number {
    return items.reduce((prev, curr) => prev + curr.cartCount * curr.price, 0);
  }

  public async getRestaurant(plate: Plate): Promise<Restaurant> {
    return new Promise(async (resolve) => {
      const restaurant = await this.restaurantService.getRestaurant(plate.companyId, plate.branchId);
      resolve(restaurant);
    });
  }
}
