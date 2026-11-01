export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  cover: string;
  description: string;
}
export interface CartItem {
  book: Book;
  quantity: number;
}
