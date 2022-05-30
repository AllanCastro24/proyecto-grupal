import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderDetailsDialogComponent } from 'src/app/shared/order-details-dialog/order-details-dialog.component';
import { UsersService } from 'src/app/users/users.service';
import { Plate } from '../../restaurants/plates';
import { RestaurantService } from '../../restaurants/restaurant.service';
import { Order, Restaurant } from '../../restaurants/restaurants';
import { AccountService } from '../account.service';
import { DeliveryOrder, OrderStatus } from './delivery';
import { DeliveryService } from './delivery.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  public ordersList: DeliveryOrder[] = [];

  public restaurants: Restaurant[] = [];

  public restaurantId!: number;
  public companyId!: number;

  public status: OrderStatus[] = [
    {
      id: 1,
      name: 'Aceptar',
    },
    {
      id: 2,
      name: 'Sin aceptar',
    },
    {
      id: 3,
      name: 'Vas en camino',
    },
    {
      id: 4,
      name: 'Completar',
    },
    {
      id: 5,
      name: 'Completado',
    },
    {
      id: 6,
      name: 'Cancelado',
    }
  ];

  constructor(public restaurantService: RestaurantService, private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.getOrdersList();
  }

  public async getOrdersList() {
    this.ordersList = (await this.deliveryService.getOrders().toPromise()) || [];

    for (let i = 0; i < this.ordersList.length; i++) {
      const plate = this.ordersList[i].items[0];
      const restaurants = await this.restaurantService.getRestaurant(plate.companyId, plate.branchId);

      this.restaurants = [...this.restaurants, restaurants];
    }
  }

  public getTotalItems(items: Plate[]): number {
    return items.reduce((prev, curr) => prev + curr.cartCount, 0);
  }

  public getTotalPrice(items: Plate[]): number {
    return items.reduce((prev, curr) => prev + curr.cartCount * curr.price, 0);
  }

  public isOrderTaken(order: DeliveryOrder) {
    const id = this.deliveryService.getOrder(order.id)?.status?.id || -1;
    const name = this.status.find((status) => status.id == id)?.name;

    return name || this.status[0].name;
  }

  public getRestaurant(plate: Plate) {
    return this.restaurants.find((restaurant) => restaurant.id == plate.branchId && restaurant.companyId == plate.companyId);
  }

  public restartOrders() {
    this.deliveryService.restartOrders();
  }
}
