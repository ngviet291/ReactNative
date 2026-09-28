import React, { useReducer } from "react";

import {
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";

import {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

type CartStackParamList = {
  CartScreen: undefined;

  Checkout: {
    totalPrice: number;
  };
};

type CartNavigationProp =
  NativeStackNavigationProp<
    CartStackParamList,
    "CartScreen"
  >;

interface Props {
  navigation: CartNavigationProp;
}

interface CartState {
  quantity: number;
}

type CartAction =
  | { type: "ADD" }
  | { type: "REMOVE" }
  | { type: "RESET" };

const initialState: CartState = {
  quantity: 0,
};

function cartReducer(
  state: CartState,
  action: CartAction
): CartState {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        quantity: state.quantity + 1,
      };

    case "REMOVE":
      return {
        ...state,
        quantity: Math.max(
          0,
          state.quantity - 1
        ),
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export default function CartScreen({
  navigation,
}: Props) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  // Ví dụ mỗi sản phẩm 100.000đ
  const totalPrice =
    state.quantity * 100000;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Số sản phẩm: {state.quantity}
      </Text>

      <Text style={styles.total}>
        Tổng tiền:{" "}
        {totalPrice.toLocaleString("vi-VN")}đ
      </Text>

      <Button
        title="Thêm sản phẩm"
        onPress={() =>
          dispatch({ type: "ADD" })
        }
      />

      <Button
        title="Bớt sản phẩm"
        onPress={() =>
          dispatch({ type: "REMOVE" })
        }
      />

      <Button
        title="Xóa giỏ hàng"
        onPress={() =>
          dispatch({ type: "RESET" })
        }
      />

      <Button
        title="Thanh toán"
        onPress={() =>
          navigation.navigate("Checkout", {
            totalPrice: totalPrice,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 22,
    textAlign: "center",
  },

  total: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
});
