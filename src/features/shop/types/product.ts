export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
}
export interface CartItem {
  product: Product;
  quantity: number;
}
