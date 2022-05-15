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
  note?: string;
  menuId: number;
  branchId: number;
  companyId: number;
}

interface Image {
  small: string;
  medium: string;
  big: string;
}
