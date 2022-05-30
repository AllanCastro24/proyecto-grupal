import { Plate } from '../../restaurants/plates';

export interface DeliveryOrder {
  id: number;
  accountId: number;
  date: string;
  items: Plate[];
  status: OrderStatus;
}

export interface OrderStatus {
  id: number;
  name: string;
}
