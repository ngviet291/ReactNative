import React, { useEffect, useState } from "react";
import { Product } from "../../bai14/types/Product";
import { api } from "../../api/api";
import { fetchProductsPaged } from "../../bai14/api/fetchProductsPaged";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

const ProductsListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const fetchProducts = async (isRefresh: boolean = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    try {
      const res = await fetch(api.products);
      const data = await res.json();
      setProducts(data.products);
      setTotal(data.total);
    } catch (e) {
      console.log(e);
      Alert.alert("Lỗi", "Không thể tải dữ liệu sản phẩm");
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchProducts(true);
  }, []);
  const handleRefresh = () => {
    fetchProducts(true);
  };
  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Tổng sản phẩm: {total}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.title}</Text>
            <Text>{item.price}$</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Không có sản phẩm nào</Text>}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  item: {
    padding: 10,
    marginBottom: 8,
    backgroundColor: "#eee",
    borderRadius: 6,
  },
  name: {
    fontWeight: "600",
  },
});
export default ProductsListScreen;
