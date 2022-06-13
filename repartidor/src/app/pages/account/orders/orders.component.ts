import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { Plate } from '../../restaurants/plates';
import { RestaurantService } from '../../restaurants/restaurant.service';
import { Restaurant } from '../../restaurants/restaurants';
import { DeliveryOrder, status } from './delivery';
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

  constructor(public restaurantService: RestaurantService, private deliveryService: DeliveryService, public menuService: MenuService) {}

  ngOnInit(): void {
    this.getOrdersList();
    this.menuService.toggleMenu(true);
  }

  public async getOrdersList() {
    this.ordersList = await this.deliveryService.getOrders();

    for (const order of this.ordersList) {
      const plate = order.items[0];
      const restaurants = await this.restaurantService.getRestaurant(plate.branchId, plate.companyId);

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
    const name = status.find((status) => status.id == id)?.name;

    return name || status[0].name;
  }

  public getRestaurant(plate: Plate) {
    return this.restaurants.find((restaurant) => restaurant.id == plate.branchId && restaurant.companyId == plate.companyId);
  }

  public restartOrders() {
    this.deliveryService.restartOrders();
  }
}
