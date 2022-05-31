import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/users/users';
import { UsersService } from 'src/app/users/users.service';
import { environment } from 'src/environments/environment';
import { DeliveryOrder } from './delivery';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  public url = environment.url + '/assets/data/';

  constructor(public http: HttpClient, public usersService: UsersService) {}

  public getOrders(): Observable<DeliveryOrder[]> {
    return this.http.get<DeliveryOrder[]>(`${this.url}delivery/orders.json`);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}delivery/users.json`);
  }

  public addOrder(order: DeliveryOrder) {
    const user = this.usersService.getUser();

    if (!user.deliveryOrders) {
      user.deliveryOrders = [];
    }

    user.deliveryOrders.push(order);

    this.usersService.setUser(user);
  }

  public orderAccepted(order: DeliveryOrder) {
    const user = this.usersService.getUser();

    if (!user.deliveryOrders) {
      return false;
    }

    const index = user.deliveryOrders.findIndex((o) => o.id == order.id);

    return index != -1;
  }

  public getOrder(id: number): DeliveryOrder {
    const user = this.usersService.getUser();

    if (!user.deliveryOrders) {
      return <DeliveryOrder>{};
    }

    const order = user.deliveryOrders.find((o) => o.id == id);

    return order || <DeliveryOrder>{};
  }

  public updateOrder(order: DeliveryOrder) {
    const user = this.usersService.getUser();

    if (!user.deliveryOrders) {
      return;
    }

    const index = user.deliveryOrders.findIndex((o) => o.id == order.id);

    if (index != -1) {
      user.deliveryOrders[index] = order;
    }

    this.usersService.setUser(user);
  }

  public restartOrders() {
    const user = this.usersService.getUser();

    user.deliveryOrders = [];

    this.usersService.setUser(user);
  }
}
