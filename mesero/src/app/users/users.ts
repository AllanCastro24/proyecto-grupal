import { Address, Payment } from '../pages/account/account';
import { Table } from '../pages/account/tables/waiter-menu/waiter';
import { CartList, Order, Restaurant } from '../pages/restaurants/restaurants';

export class User {
  id?: number = 0;
  default?: boolean = false;
  username: string = '';
  password?: string = '';
  profile?: UserProfile;
  work?: UserWork;
  contacts?: UserContacts;
  social?: UserSocial;
  settings?: UserSettings;
  favoriteRestaurants?: Restaurant[];
  orderList?: Order[];
  cartList?: CartList[];
  addressList?: Address[];
  paymentList?: Payment[];
  tableList?: Table[];
}

export class UserProfile {
  name: string = '';
  surname: string = '';
  birthday?: Object;
  gender: string = '';
  image: string = '';
}

export class UserWork {
  companyId: string = '';
  branchId: string = '';
  positionId: string = '';
  salary: number = 0;
}

export class UserContacts {
  email: string = '';
  phone: string = '';
}

export class UserSocial {
  facebook: string = '';
  twitter: string = '';
  google: string = '';
}

export class UserSettings {
  isActive: boolean = false;
  isDeleted: boolean = false;
  registrationDate!: Date;
  joinedDate!: Date;
}

export interface Position {
  id: number;
  name: string;
  status: number;
}
