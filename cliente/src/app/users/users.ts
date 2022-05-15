import { Plate } from '../pages/restaurants/plates';
import { CartList, Order, Restaurant } from '../pages/restaurants/restaurants';

export class User {
  id?: number = 0;
  username: string = '';
  password: string = '';
  profile?: UserProfile;
  work?: UserWork;
  contacts?: UserContacts;
  social?: UserSocial;
  settings?: UserSettings;
  favoriteRestaurants?: Restaurant[];
  orderList?: Order[];
  cartList?: CartList[];
}

export class UserProfile {
  name: string = '';
  surname: string = '';
  birthday!: Object;
  gender: string = '';
  image: string = '';
}

export class UserWork {
  company: string = '';
  position: string = '';
  salary: number = 0;
}

export class UserContacts {
  email: string = '';
  phone: string = '';
  address: string = '';
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

export interface Data {
  success: Success;
  data: User;
}

export interface Success {
  success: boolean;
}
