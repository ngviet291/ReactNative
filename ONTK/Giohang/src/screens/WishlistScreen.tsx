import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import BookCard from "../components/BookCard";
import { RootState } from "../store/store";

export const WishlistScreen = () => {
  const books = useSelector((s: RootState) => s.wishlist);
  return (
    <FlatList
      data={books}
      keyExtractor={(b) => b.id}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      renderItem={({ item }) => <BookCard book={item}></BookCard>}></FlatList>
  );
};
