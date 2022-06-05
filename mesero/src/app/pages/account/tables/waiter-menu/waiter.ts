import { Plate } from 'src/app/pages/restaurants/plates';

export interface Table {
  id: number;
  date: string;
  items: Plate[];
  status: _Status;
  paymentMethod?: _PaymentMethod;
}

export interface _Status {
  id: number;
  name: string;
}

export interface _PaymentMethod {
  id: number;
  name: string;
}

export enum PaymentMethod {
  Cash = 1,
  CreditCard = 2,
  DebitCard = 3,
}

export enum Status {
  TakingNote = 0,
  NoteTaken = 1,
  UnPaid = 2,
  Paid = 3,
  Canceled = 4,
}

export const _status: _Status[] = [
  {
    id: 0,
    name: 'Tomando nota',
  },
  {
    id: 1,
    name: 'Nota tomada',
  },
  {
    id: 2,
    name: 'No pagado',
  },
  {
    id: 3,
    name: 'Pagado',
  },
  {
    id: 4,
    name: 'Cancelado',
  },
];
