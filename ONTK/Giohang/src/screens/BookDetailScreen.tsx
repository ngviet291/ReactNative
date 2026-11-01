import React from "react";
import { Button, Image, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, RootState, toggle } from "../store/store";
import { Book } from "../type";
import { RootStackParams } from "../navigation/AppNavigator";
type Props = {
  route: {
    params: RootStackParams["BookDetail"];
  };
};
const BookDetailScreen = ({ route }: Props) => {
  const book = route.params.book;
  const dispatch = useDispatch();
  const liked = useSelector((s: RootState) =>
    s.wishlist.some((b) => b.id === book.id),
  );
  return (
    <View>
      <Image source={{ uri: book.cover }} style={{ width: 200, height: 300 }} />
      <Text>{book.title}</Text>
      <Text>{book.author}</Text>
      <Text>{book.price} đ</Text>
      <Text>Còn {book.stock} cuốn</Text>
      <Text>{book.description}</Text>
      <Button
        title={book.stock === 0 ? "Hết hàng" : "Thêm vào giỏ"}
        disabled={book.stock === 0}
        onPress={() => dispatch(addToCart(book))}
      />
      <Button
        title={!liked ? "Thêm vào yêu thích" : "Đã yêu thích"}
        onPress={() => dispatch(toggle(book))}></Button>
    </View>
  );
};

export default BookDetailScreen;
