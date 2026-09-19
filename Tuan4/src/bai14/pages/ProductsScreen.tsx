import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Product } from "../types/Product";
import { fetchProductsPaged } from "../api/fetchProductsPaged";

const ProductsScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page] = useState(1);

  useEffect(() => {
    fetchProductsPaged(page)
      .then((res) => {
        setProducts(res.data);
        setTotal(res.total);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [page]);

  return (
    <View style={styles.container}>
      <Text>Tổng sản phẩm: {total}</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.price}$</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
    flex: 1,
  },
  item: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#eee",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductsScreen;
