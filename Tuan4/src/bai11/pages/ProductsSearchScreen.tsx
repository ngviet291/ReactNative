import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { api } from "../../api/api";

export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

const ProductsSearchScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    const fetchProducts = async (keyword: string, limit: number) => {
      try {
        const res = await fetch(api.productsSearch(keyword, limit));

        const data = await res.json();

        setProducts(data.products as Product[]);
      } catch (e) {
        console.log(e);
      }
    };

    if (keyword) {
      fetchProducts(keyword, 10);
    }
  }, [keyword]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập sản phẩm"
        value={keyword}
        onChangeText={setKeyword}
      />

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
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
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

export default ProductsSearchScreen;
