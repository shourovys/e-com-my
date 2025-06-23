export interface Product {
  id: string;
  image: string;
  title: string;
  discountPrice: number;
  regularPrice?: number;
  discountBadge?: string;
  description?: string;
  countryOfOrigin?: string;
  brand?: string;
  rating?: number;
  reviewCount?: number;
}
