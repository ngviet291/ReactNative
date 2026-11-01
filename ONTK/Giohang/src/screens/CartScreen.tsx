import React from "react";
import { Button, FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Book } from "../type";
import { clearCart, removeFromCart, RootState } from "../store/store";

const CartScreen = () => {
  const cart = useSelector((s: RootState) => s.cart);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, i) => sum + i.book.price * i.quantity, 0);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={cart}
        keyExtractor={(i) => i.book.id}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.book.title} x {item.quantity}=
              {(item.book.price * item.quantity).toLocaleString("vi-VN")} đ
            </Text>
            <Button
              title="Xóa sản phẩm"
              onPress={() => dispatch(removeFromCart(item.book.id))}></Button>
          </View>
        )}></FlatList>
      <Text>Tổng : {total.toLocaleString("vi-VN")}đ</Text>
      <Button title="Xóa tất cả" onPress={() => dispatch(clearCart())}></Button>
    </View>
  );
};

export default CartScreen;
