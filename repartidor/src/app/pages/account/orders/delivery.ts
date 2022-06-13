import { Plate } from '../../restaurants/plates';
import { Address } from '../account';

export interface DeliveryOrder {
  id: number;
  accountId: number;
  date: string;
  items: Plate[];
  address: Address;
  status: OrderStatus;
}

export interface OrderStatus {
  id: number;
  name: string;
}

export const status: OrderStatus[] = [
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
