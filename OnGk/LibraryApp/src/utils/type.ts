export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  rating: number;
  cover: string;
  isBorrowed: boolean;
}
export interface BookCardProps {
  book: Book;
  layout?: "row" | "tile";
  onSelect: (id: string) => void;
}
