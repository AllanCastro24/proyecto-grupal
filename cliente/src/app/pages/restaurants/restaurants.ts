export interface Restaurant {
  id: number;
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
