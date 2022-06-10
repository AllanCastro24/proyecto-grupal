import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { UsersService } from 'src/app/users/users.service';
import { DeliveryType, Payment } from '../account/account';
import { AccountService } from '../account/account.service';
import { Plate } from '../restaurants/plates';
import { RestaurantService } from '../restaurants/restaurant.service';
import { Order, OrderStatus, Restaurant } from '../restaurants/restaurants';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  private sub: any;

  public restaurantId!: number;
  public companyId!: number;

  public restaurant!: Restaurant;

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
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    public usersService: UsersService,
    public restaurantService: RestaurantService,
    public menuService: MenuService,
    private accountService: AccountService,
    public router: Router
  ) {}

  async ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.restaurantId = params['id'];
      this.companyId = params['companyId'];
    });

    this.menuService.toggleMenu(false);

    await this.getRestaurant();
    this.getCartList();
    this.setAddress();
    this.updateTotal();
    this.getDefaultPayment();
    this.hasDefaultPayment();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public async getRestaurant() {
    return new Promise(async (resolve, reject) => {
      this.restaurant = await this.restaurantService.getRestaurant(this.restaurantId, this.companyId);
      resolve(true);
    });
  }

  public setAddress() {
    this.addressTop = this.getDefaultAddress().postalCode;
    this.addressBottom = this.getDefaultAddress().address || '?';
  }

  public getCartList() {
    this.cartItems = this.restaurantService.getCartList(this.restaurantId, this.companyId);
    this.subtotal = this.cartItems.reduce((acc, cur) => acc + cur.price * cur.cartCount, 0);
  }

  public getDefaultAddress() {
    return this.accountService.getAddress(this.accountService.getDefaultAddress());
  }

  public onClickDeliveryType($event: any) {
    const target = $event.target.closest('.delivery-type-item');
    const id = Number(target.id.split('-')[2]);

    console.log(target, id);

    if (id === this.deliveryType) {
      return;
    }

    const previous = document.getElementById(`delivery-type-${this.deliveryType}`);
    previous?.classList.remove('active');

    target?.classList.add('active');

    this.deliveryType = id;

    this.onChangeDelieryType();
    this.updateTotal();
  }

  public onChangeDelieryType() {
    if (this.deliveryType === DeliveryType.Delivery) {
      this.deliveryPlaceIcon = 'place';

      this.addressAction = 'Entregar';
      this.addressTop = this.getDefaultAddress().postalCode;
      this.addressBottom = this.getDefaultAddress().address;
    } else {
      this.deliveryPlaceIcon = 'store';

      this.addressAction = 'Recoger';
      this.addressTop = this.restaurant.name;
      this.addressBottom = this.restaurant.address;
    }
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
    this.payment = this.accountService.getPayment(this.accountService.getDefaultPayment());
    console.log(this.payment);
  }

  public hasDefaultPayment() {
    this.hasPayment = Object.keys(this.payment).length !== 0;
  }

  public getCardNumber() {
    return this.payment.cardNumber.replace(/\d{4}$/, '****');
  }

  public async placeOrder() {
    if (this.accountService.getDefaultPayment() === -1 || this.accountService.getDefaultAddress() === -1) {
      return;
    }

    const order: Order = {
      id: this.restaurantService.getOrders().length + 1,
      accountId: this.usersService.getUser().id || 0,
      address: this.accountService.getAddresses()[this.accountService.getDefaultAddress()],
      deliveryTypeId: this.deliveryType,
      payment: this.accountService.getPayments()[this.accountService.getDefaultPayment()],
      date: Date.now().toString(),
      items: this.cartItems,
      status: this.status[0],
    };

    const orderInfo: any = {
      deliveryAddress: {
        address: order.address.address,
        city: order.address.city,
        email: order.address.email,
        firstName: order.address.firstName,
        lastName: order.address.lastName,
        middleName: order.address.middleName,
        phone: order.address.phone,
        place: order.address.place,
        postalCode: order.address.postalCode,
      },
      deliveryMethod: {
        method: {
          desc: '',
          name: this.deliveryType ? 'Envio Normal' : 'Pickup',
          value: 'Normal',
        },
      },
      paymentMethod: '',
      paymentMethods: {
        method: {
          desc: '',
          name: 'Pago Con Tarjeta',
          value: 'Tarjeta',
          method: '',
        },
      },
      method: '',
      cardHolderName: '',
      cardNumber: '',
      cvv: '',
      expiredMonth: '',
      expiredYear: '',
    };

    await this.restaurantService
      .addOrderInfoDb(orderInfo)
      .toPromise()
      .catch((err) => {
        console.log(err);
      });

    for (const orderItem of order.items) {
      const order: any = {
        idtienda: this.companyId,
        idsuc: this.restaurantId,
        id: orderItem.id,
        name: orderItem.name,
        description: orderItem.description,
        price: orderItem.price,
        cartCount: orderItem.cartCount,
        categoryId: orderItem.menuId,
        estatus: 'ALTA',
      };

      await this.restaurantService
        .addOrderDb(order)
        .toPromise()
        .catch((err) => console.log(err));
    }

    this.restaurantService.addOrder(order);
    this.restaurantService.removeCartList(this.restaurantId, this.companyId);
    this.restaurantService.calculateCartListTotal();

    this.router.navigate(['/cart']);
  }

  public onReturn() {
    this._location.back();
  }
}
