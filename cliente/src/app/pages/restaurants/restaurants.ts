export interface Restaurant {
  id: number;
  name: string;
  image: string;
  // description: string;
  // address: string;
  // phone: string;
  // email: string;
  // website: string;
  // latitude: number;
  // longitude: number;
  // rating: number;
  // opening_hours: string;
  // price_range: number;
  categories: number[];
  delivery: Delivery;
}

interface Delivery {
  price: number;
  time: number;
}
