export interface User {
  id: number | string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Review {
  id: number | string;
  username: string;
  rating: number;
  comment: string;
}

export interface Book {
  id: number | string;
  title: string;
  categoryId: number | string;
  image: string;
}