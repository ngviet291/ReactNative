import React from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { Book } from "../type";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, RootState, toggle } from "../store/store";
import { Ionicons } from "@expo/vector-icons";
export default function BookCard({ book }: { book: Book }) {
  const nav = useNavigation<any>();
  const dispatch = useDispatch();
  const liked = useSelector((s: RootState) =>
    s.wishlist.some((b) => b.id === book.id),
  );
  return (
    <TouchableOpacity
      onPress={() => nav.navigate("BookDetail", { book })}
      style={{ width: "45%" }}>
      <View>
        <Image
          source={{ uri: book.cover }}
          style={{ width: "100%", height: 150 }}
        />

        <Text
          style={{ position: "absolute", top: 0, right: 0, fontSize: 28 }}
          onPress={() => dispatch(toggle(book))}>
          <Ionicons
            name="heart"
            size={30}
            color={liked ? "red" : "white"}></Ionicons>
        </Text>
      </View>

      <Text>{book.title}</Text>
      <Text>{book.price.toLocaleString("vi-VN")} đ</Text>
      <Button
        title={book.stock > 0 ? "Thêm vào giỏ hàng" : "Hết hàng"}
        disabled={book.stock === 0}
        onPress={() => dispatch(addToCart(book))}></Button>
    </TouchableOpacity>
  );
}
