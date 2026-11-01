export interface Food {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  isFavorite: boolean;
}
export interface FoodCardProps {
  food: Food;
  layout?: "row" | "tile";
  onSelect: (food: Food) => void;
  onLongPress: (food: Food) => void;
}
