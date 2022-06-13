import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/users/users';
import { UsersService } from 'src/app/users/users.service';
import { environment } from 'src/environments/environment';
import { RestaurantService } from '../../restaurants/restaurant.service';
import { DeliveryOrder, status } from './delivery';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  public url = environment.url + '/assets/data/';
  public urlDb = 'http://localhost/proyecto-grupal-backend/';

  constructor(public http: HttpClient, public usersService: UsersService, private restaurantService: RestaurantService) {}

  public async getOrders(): Promise<DeliveryOrder[]> {
    const url = `${this.url}delivery/orders.json`;
    const orders = (await this.http.get<DeliveryOrder[]>(url).toPromise()) || [];
    const branchs = await this.restaurantService.getBranchsDb();
    const formattedOrders = [...orders];

    for (const branch of branchs) {
      const orders: any = (await this.getOrderDb(branch.id, branch.companyId).toPromise()) || [];

      for (const order of orders) {
        const formattedOrder: DeliveryOrder = {
          id: order.id,
          accountId: order.idcli,
          date: order.fecha,
          items: [
            {
              id: 1,
              name: order.name,
              description: '',
              price: order.price,
              image: {
                small: 'assets/images/foods/default.png',
                medium: 'assets/images/foods/default.png',
                big: 'assets/images/foods/default.png',
              },
              availibilityCount: -1,
              cartCount: Number(order.cartCount),
              weight: -1,
              note: '',
              menuId: -1,
              branchId: branch.id,
              companyId: branch.companyId,
            },
          ],
          address: {
            id: -1,
            default: false,
            firstName: order.firstName,
            lastName: order.lastName,
            middleName: order.MiddleName,
            company: '',
            email: order.email,
            phone: order.phone,
            country: {
              name: '',
              code: '',
            },
            city: order.city,
            place: order.place,
            postalCode: order.postalCode,
            address: order.address,
            latitude: '25.8127617',
            longitude: '-108.9844326',
          },
          status: status[0],
        };

        formattedOrders.push(formattedOrder);
      }
    }

    return formattedOrders;
  }

  public getOrdersDb() {
    return this.http.get<DeliveryOrder[]>(this.urlDb + 'api/pedidos/listar');
  }

  public getOrderDb(branchId: number, companyId: number) {
    return this.http.get<DeliveryOrder[]>(`${this.urlDb}mostpedidos/${branchId}/${companyId}`);
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
