import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
} from "react-native";

import {
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

type HomeStackParamList = {
  HomeScreen: undefined;

  BookDetail: {
    bookId: string;
  };
};

type Props = NativeStackScreenProps<
  HomeStackParamList,
  "BookDetail"
>;

export default function BookDetailScreen({
  route,
  navigation,
}: Props) {
  const { bookId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Chi tiết sách
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Book ID:
        </Text>

        <Text style={styles.id}>
          {bookId}
        </Text>

        <Text style={styles.bookName}>
          Tên sách
        </Text>

        <Text style={styles.description}>
          Đây là trang chi tiết của cuốn sách
          có ID: {bookId}
        </Text>

        <Text style={styles.price}>
          Giá: 100.000đ
        </Text>

        <Button
          title="Quay lại"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    padding: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
  },

  label: {
    fontSize: 16,
    color: "#666",
  },

  id: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 20,
  },

  bookName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    marginBottom: 20,
  },
});