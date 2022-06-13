import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { Plate } from 'src/app/pages/restaurants/plates';
import { RestaurantService } from 'src/app/pages/restaurants/restaurant.service';
import { OrderStatus, Restaurant } from 'src/app/pages/restaurants/restaurants';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { User } from 'src/app/users/users';
import { UsersService } from 'src/app/users/users.service';
import { Address } from '../../account';
import { DeliveryOrder, status } from '../delivery';
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

  public _status: OrderStatus[] = status;
  
  public deliveryStatusTop = status[1];
  public deliveryStatusBottom = status[0];

  constructor(
    private activatedRoute: ActivatedRoute,
    public usersService: UsersService,
    public restaurantService: RestaurantService,
    public menuService: MenuService,
    public router: Router,
    private deliveryService: DeliveryService,
    private snackBar: MatSnackBar
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
    const orders = await this.deliveryService.getOrders();

    this.order = orders.find((order) => order.id == this.orderId) || <DeliveryOrder>{};

    this.restaurantId = this.order.items[0].branchId;
    this.companyId = this.order.items[0].companyId;
  }

  public async getUser() {
    const users = (await this.deliveryService.getUsers().toPromise()) || [];

    this.user = users.find((user) => user.id == this.order.accountId) || <User>{};

    // TODO: provisional
    if (!this.user.addressList) {
      this.user.addressList = [this.order.address];
    }
  }

  public async getRestaurant() {
    this.restaurant = await this.restaurantService.getRestaurant(this.restaurantId, this.companyId);
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
    if (!this.allowActions()) {
      return;
    }

    const address = `${this.restaurant.latitude},${this.restaurant.longitude}`;

    Browser.open({
      url: `https://www.google.com/maps/dir//${address}/@${address},20z`,
    });
  }

  public openClientAddress() {
    if (!this.allowActions()) {
      return;
    }

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
      this.deliveryStatusTop = status[2];
      this.deliveryStatusBottom = status[3];
    } else if (this.order.status.id == 5) {
      this.deliveryStatusTop = status[4];
      this.deliveryStatusBottom = status[4];
    } else if (this.order.status.id == 6) {
      this.deliveryStatusTop = status[5];
      this.deliveryStatusBottom = status[5];
    }
  }

  public changeStatus() {
    this.order.status = status[2];

    if (this.deliveryStatusBottom == status[0]) {
      this.deliveryService.addOrder(this.order);

      this.deliveryStatusTop = status[2];
      this.deliveryStatusBottom = status[3];
    } else if (this.deliveryStatusBottom == status[3]) {
      this.order.status = status[4];
      this.deliveryService.updateOrder(this.order);

      this.deliveryStatusTop = status[4];
      this.deliveryStatusBottom = status[4];
    } else {
      this.onReturn();
    }
  }

  public cancelOrder() {
    this.order.status = status[5];
    this.deliveryService.updateOrder(this.order);

    this.deliveryStatusTop = status[5];
    this.deliveryStatusBottom = status[5];
  }

  public allowActions() {
    const messages = ['Primero acepta el pedido', 'El pedido está completado', 'El pedido está cancelado'];
    const message = this.order.status.id == 5 ? messages[1] : this.order.status.id == 6 ? messages[2] : messages[0];

    if (this.order.status.id != 3) {
      this.snackBar.open(message, '', {
        verticalPosition: 'top',
        duration: 1000,
        panelClass: ['error'],
      });
    }

    return this.deliveryService.orderAccepted(this.order) && !(this.order.status.id == 5 || this.order.status.id == 6);
  }
}
