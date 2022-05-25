import { Address, Payment } from '../account/account';
import { Plate } from './plates';

export interface Restaurant {
  id: number;
  companyId: number;
  name: string;
  image: string;
  // description: string;
  address: string;
  // phone: string;
  // email: string;
  // website: string;
  latitude: number;
  longitude: number;
  rating: {
    average: number;
    count: number;
  };
  schedule: any;
  categoryId: number[];
  tagId: number[];
  delivery: Delivery;
  pickup: Pickup;
}

interface Delivery {
  price: number;
  time: number;
}

interface Pickup {
  price: number;
  time: number;
}

export interface Menu {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  accountId: number;
  address: Address;
  payment: Payment;
  deliveryTypeId: number;
  date: string;
  items: Plate[];
  status: OrderStatus;
}

//Completed, Processing, On Hold, Refunded, Pending
export interface OrderStatus {
  id: number;
  name: string;
}

export interface CartList {
  id: number;
  branchId: number;
  companyId: number;
  name: string;
  image: string;
  quantity?: number;
  amount?: number;
  items: Plate[];
}
