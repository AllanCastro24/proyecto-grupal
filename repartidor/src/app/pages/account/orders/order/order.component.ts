import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { Plate } from 'src/app/pages/restaurants/plates';
import { RestaurantService } from 'src/app/pages/restaurants/restaurant.service';
import { Order, OrderStatus, Restaurant } from 'src/app/pages/restaurants/restaurants';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { User } from 'src/app/users/users';
import { UsersService } from 'src/app/users/users.service';
import { DeliveryType, Payment, Address } from '../../account';
import { DeliveryOrder } from '../delivery';
import { DeliveryService } from '../delivery.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  private sub: any;

  public orderId!: number;
  public restaurantId!: number;
  public companyId!: number;

  public user!: User;
  public restaurant!: Restaurant;
  public order!: DeliveryOrder;
  public cartItems: Plate[] = [];

  public restaurantAddress: string = '';
  public clientAddress!: Address;

  public subtotal: number = 0;
  public total: number = 0;

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
    },
  ];
  public deliveryStatusTop = this.status[1];
  public deliveryStatusBottom = this.status[0];

  constructor(
    private activatedRoute: ActivatedRoute,
    public usersService: UsersService,
    public restaurantService: RestaurantService,
    public menuService: MenuService,
    public router: Router,
    private deliveryService: DeliveryService
  ) {}

  async ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.orderId = params['id'];
    });

    this.menuService.toggleMenu(false);

    await this.setupOrder();
    await this.getUser();
    await this.getRestaurant();
    this.setStatus();
    this.getCartList();
    this.setRestaurantAddress();
    this.setClientAddress();
    this.updateTotal();

    console.log(this.cartItems, this.restaurantId, this.companyId);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public async setupOrder() {
    const orders = (await this.deliveryService.getOrders().toPromise()) || [];

    this.order = orders.find((order) => order.id == this.orderId) || <DeliveryOrder>{};

    this.restaurantId = this.order.items[0].branchId;
    this.companyId = this.order.items[0].companyId;
  }

  public async getUser() {
    const users = (await this.deliveryService.getUsers().toPromise()) || [];

    this.user = users.find((user) => user.id == this.order.accountId) || <User>{};
  }

  public async getRestaurant() {
    this.restaurant = await this.restaurantService.getRestaurant(this.companyId, this.restaurantId);
  }

  public setRestaurantAddress() {
    this.restaurantAddress = this.restaurant.address;
  }

  public setClientAddress() {
    this.clientAddress = (this.user.addressList || [])[0] || <Address>{};
  }

  public getCartList() {
    this.cartItems = this.order.items;
    this.subtotal = this.cartItems.reduce((acc, cur) => acc + cur.price * cur.cartCount, 0);
  }

  public openRestaurantAddress() {
    const address = `${this.restaurant.latitude},${this.restaurant.longitude}`;

    Browser.open({
      url: `https://www.google.com/maps/dir//${address}/@${address},20z`,
    });
  }

  public openClientAddress() {
    const address = `${this.clientAddress.latitude},${this.clientAddress.longitude}`;

    Browser.open({
      url: `https://www.google.com/maps/dir//${address}/@${address},20z`,
    });
  }

  public updateTotal() {
    this.total = this.subtotal + this.restaurant.delivery.price;
  }

  public onReturn() {
    this.menuService.toggleMenu(true);
    this.router.navigate(['/orders']);
  }

  public setStatus() {
    if (this.deliveryService.orderAccepted(this.order)) {
      this.order.status = this.deliveryService.getOrder(this.order.id).status;
    }

    if (this.order.status.id == 3) {
      this.deliveryStatusTop = this.status[2];
      this.deliveryStatusBottom = this.status[3];
    } else if (this.order.status.id == 5) {
      this.deliveryStatusTop = this.status[4];
      this.deliveryStatusBottom = this.status[4];
    } else if (this.order.status.id == 6) {
      this.deliveryStatusTop = this.status[5];
      this.deliveryStatusBottom = this.status[5];
    }
  }

  public changeStatus() {
    this.order.status = this.status[2];

    if (this.deliveryStatusBottom == this.status[0]) {
      this.deliveryService.addOrder(this.order);

      this.deliveryStatusTop = this.status[2];
      this.deliveryStatusBottom = this.status[3];
    } else if (this.deliveryStatusBottom == this.status[3]) {
      this.order.status = this.status[4];
      this.deliveryService.updateOrder(this.order);

      this.deliveryStatusTop = this.status[4];
      this.deliveryStatusBottom = this.status[4];
    } else {
      this.onReturn();
    }
  }

  public cancelOrder() {
    this.order.status = this.status[5];
    this.deliveryService.updateOrder(this.order);

    this.deliveryStatusTop = this.status[5];
    this.deliveryStatusBottom = this.status[5];
  }
}
