import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import {
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

type CartStackParamList = {
  CartScreen: undefined;

  Checkout: {
    totalPrice: number;
  };
};

type Props = NativeStackScreenProps<
  CartStackParamList,
  "Checkout"
>;

export default function CheckoutScreen({
  route,
}: Props) {
  const { totalPrice } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Thanh toán
      </Text>

      <Text style={styles.label}>
        Tổng tiền:
      </Text>

      <Text style={styles.price}>
        {totalPrice.toLocaleString("vi-VN")}đ
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  label: {
    fontSize: 18,
    color: "#666",
  },

  price: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: "bold",
    color: "red",
  },
});
