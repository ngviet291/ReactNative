import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Product, ProductResponse } from "../types";
import { initialProductState, productReducer } from "../reducer/productReducer";
import ProductRow from "../components/ProductRow";

const LIMIT = 10;

const ProductScreenTwo = () => {
  /* Toàn bộ state danh sách nằm trong 1 reducer */
  const [state, dispatch] = useReducer(productReducer, initialProductState);
  const { products, loading, refreshing, loadingMore, error, page, total } =
    state;

  /* Ô tìm kiếm — không thuộc CRUD nên vẫn để useState riêng */
  const [query, setQuery] = useState("");

  /* ==================== Gọi API ==================== */
  const loadData = async (
    targetPage: number,
    mode: "first" | "refresh" | "more" = "first",
  ) => {
    dispatch({ type: "FETCH_START", payload: { mode } });

    try {
      const skip = (targetPage - 1) * LIMIT;
      const res = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`,
      );
      if (!res.ok) throw new Error("Không thể tải danh sách sản phẩm.");

      const data: ProductResponse = await res.json();
      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          products: data.products,
          total: data.total,
          page: targetPage,
        },
      });
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Đã xảy ra lỗi không xác định.";
      dispatch({ type: "FETCH_ERROR", payload: message });
    }
  };

  useEffect(() => {
    loadData(1, "first");
  }, []);

  const handleLoadMore = () => {
    if (loading || refreshing || loadingMore) return;
    if (products.length >= total) return;
    loadData(page + 1, "more");
  };

  /* ==================== Xóa sản phẩm ==================== */
  const handleDelete = useCallback((product: Product) => {
    Alert.alert("Xác nhận xóa", `Xóa "${product.title}"?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            const res = await fetch(
              `https://dummyjson.com/products/${product.id}`,
              {
                method: "DELETE",
              },
            );
            if (!res.ok) throw new Error(`Xóa thất bại (mã ${res.status})`);

            dispatch({ type: "DELETE", payload: product.id });
          } catch (e: unknown) {
            const message =
              e instanceof Error ? e.message : "Không xóa được sản phẩm.";
            Alert.alert("Lỗi", message);
          }
        },
      },
    ]);
  }, []);

  /* ==================== Lọc theo tên ==================== */
  const filteredProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return products;
    return products.filter((p) => p.title.toLowerCase().includes(keyword));
  }, [products, query]);

  const openDetail = useCallback((product: Product) => {
    Alert.alert(
      product.title,
      `Giá: $${product.price}\n\n${product.description}`,
    );
  }, []);

  /* ==================== RENDER: loading -> error -> FlatList ==================== */
  if (loading && page === 1) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.sub}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (error && products.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Đã xảy ra lỗi</Text>
        <Text style={styles.sub}>{error}</Text>
        <Pressable style={styles.retryBtn} onPress={() => loadData(1)}>
          <Text style={styles.retryText}>Thử lại</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredProducts}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <ProductRow
          product={item}
          onPress={openDetail}
          onDelete={handleDelete}
        />
      )}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      ListEmptyComponent={
        <View style={styles.center}>
          <Text style={styles.sub}>Không tìm thấy sản phẩm nào</Text>
        </View>
      }
      ListHeaderComponent={
        <View style={{ marginBottom: 12 }}>
          <Text style={styles.screenTitle}>Sản phẩm</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Tìm theo tên..."
            style={styles.input}
          />
          <Text style={styles.sub}>
            Hiển thị {filteredProducts.length}/{total} sản phẩm
          </Text>
        </View>
      }
      refreshing={refreshing}
      onRefresh={() => loadData(1, "refresh")}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.4}
      ListFooterComponent={
        loadingMore ? (
          <ActivityIndicator style={{ marginVertical: 16 }} />
        ) : products.length >= total && products.length > 0 ? (
          <Text
            style={[styles.sub, { textAlign: "center", marginVertical: 16 }]}
          >
            Đã hiển thị hết sản phẩm
          </Text>
        ) : null
      }
    />
  );
};

export default ProductScreenTwo;

const styles = StyleSheet.create({
  listContent: { padding: 16 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  screenTitle: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  sub: { color: "#64748b", marginTop: 4 },
  errorTitle: { color: "#ef4444", fontSize: 16, fontWeight: "700" },
  retryBtn: {
    marginTop: 14,
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: { color: "#fff", fontWeight: "700" },
});
