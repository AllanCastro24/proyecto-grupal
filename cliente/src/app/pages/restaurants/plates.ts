export interface Plate {
  id: number;
  name: string;
  description: string;
  price: number;
  image: Image;
  // discount: number;
  // ratingsCount: number;
  // ratingsValue: number;
  availibilityCount: number;
  cartCount: number;
  weight: number;
  isVegetarian: boolean;
  categoryId: number;
}

interface Image {
  small: string;
  medium: string;
  big: string;
}
