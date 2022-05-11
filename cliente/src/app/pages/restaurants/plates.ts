export interface Plate {
  id: number;
  name: string;
  description: string;
  price: number;
  image: plateImage;
  discount: number;
  ratingsCount: number;
  ratingsValue: number;
  availibilityCount: number;
  cartCount: number;
  weight: number;
  isVegetarian: boolean;
  categoryId: number;
}

export interface plateImage {
  small: string;
  medium: string;
  big: string;
}
