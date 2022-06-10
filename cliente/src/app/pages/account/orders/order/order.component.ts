import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { Plate } from 'src/app/pages/restaurants/plates';
import { RestaurantService } from 'src/app/pages/restaurants/restaurant.service';
import { Order, OrderStatus, Restaurant } from 'src/app/pages/restaurants/restaurants';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { UsersService } from 'src/app/users/users.service';
import { DeliveryType, Payment } from '../../account';
import { AccountService } from '../../account.service';

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

  public restaurant!: Restaurant;
  public order!: Order;
  public cartItems: Plate[] = [];

  public addressAction: string = 'Entregar';
  public addressTop: string = '';
  public addressBottom: string = '';

  public DeliveryType = DeliveryType;
  public deliveryPlaceIcon: string = 'place';
  public deliveryType: number = DeliveryType.Delivery;

  public payment!: Payment;
  public hasPayment: boolean = false;

  public subtotal: number = 0;
  public total: number = 0;

  public status: OrderStatus[] = [
    {
      id: 1,
      name: 'Pendiente',
    },
    {
      id: 2,
      name: 'En camino',
    },
    {
      id: 3,
      name: 'Completo',
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    public usersService: UsersService,
    public restaurantService: RestaurantService,
    public menuService: MenuService,
    private accountService: AccountService,
    public router: Router
  ) {}

  async ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.orderId = params['id'];
    });

    this.menuService.toggleMenu(false);

    this.setupOrder();
    await this.getRestaurant();
    this.getCartList();
    this.setAddress();
    this.updateTotal();
    this.getDefaultPayment();
    this.hasDefaultPayment();
    this.setDelieryType();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public setupOrder() {
    this.order = this.accountService.getOrder(this.orderId);

    this.restaurantId = this.order.items[0].branchId;
    this.companyId = this.order.items[0].companyId;
  }

  public async getRestaurant() {
    return new Promise(async (resolve, reject) => {
      this.restaurant = await this.restaurantService.getRestaurant(this.restaurantId, this.companyId);
      resolve(true);
    });
  }

  public setAddress() {
    this.addressTop = this.order.address.postalCode;
    this.addressBottom = this.order.address.address;
  }

  public getCartList() {
    this.cartItems = this.order.items;
    this.subtotal = this.cartItems.reduce((acc, cur) => acc + cur.price * cur.cartCount, 0);
  }

  public setDelieryType() {
    const previous = document.getElementById(`delivery-type-${this.deliveryType}`);
    previous?.classList.remove('active');

    this.deliveryType = this.order.deliveryTypeId;

    if (this.deliveryType === DeliveryType.Delivery) {
      this.deliveryPlaceIcon = 'place';

      this.addressAction = 'Entregar';
      this.addressTop = this.order.address.postalCode;
      this.addressBottom = this.order.address.address;
    } else {
      this.deliveryPlaceIcon = 'store';

      this.addressAction = 'Recoger';
      this.addressTop = this.restaurant.name;
      this.addressBottom = this.restaurant.address;
    }

    const current = document.getElementById(`delivery-type-${this.deliveryType}`);
    current?.classList.add('active');
  }

  public openAddress() {
    if (this.deliveryType === DeliveryType.Delivery) {
      this.router.navigate(['/account/addresses']);
    } else {
      Browser.open({
        url: `https://www.google.com/maps/@${this.restaurant.latitude},${this.restaurant.longitude},20z`,
      });
    }
  }

  public updateTotal() {
    this.total = this.deliveryType === DeliveryType.Delivery ? this.subtotal + this.restaurant.delivery.price : this.subtotal;
  }

  public getDefaultPayment() {
    this.payment = this.order.payment;
  }

  public hasDefaultPayment() {
    this.hasPayment = Object.keys(this.payment).length !== 0;
  }

  public getCardNumber() {
    return this.payment.cardNumber.replace(/\d{4}$/, '****');
  }

  public onReturn() {
    this.menuService.toggleMenu(true);
    this.router.navigate(['/orders']);
  }
}
