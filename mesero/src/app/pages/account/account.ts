export interface Address {
  id: number;
  default: boolean;
  firstName: string;
  lastName: string;
  middleName: string;
  company: string;
  email: string;
  phone: string;
  country: Country;
  city: string;
  place: string;
  postalCode: string;
  address: string;
  latitude: string;
  longitude: string;
}

export interface Country {
  name: string;
  code: string;
}

export interface Payment {
  id: number;
  default: boolean;
  name: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export enum DeliveryType {
  Delivery = 1,
  Pickup = 2,
}
