export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  brand: string;
  thumbnail: string;
}
export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
export interface ProductRowProps {
  product: Product;
  onPress: (product: Product) => void;
  onDelete: (product: Product) => void;
}
