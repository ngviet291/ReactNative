import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { Product, ProductResponse, ProductRowProps } from "../types";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

const LIMIT = 10;
interface CartState {
  quantity: number;
}

type CartAction = { type: "ADD" } | { type: "REMOVE" } | { type: "RESET" };

const initialState: CartState = {
  quantity: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        quantity: state.quantity + 1,
      };

    case "REMOVE":
      return {
        ...state,
        quantity: Math.max(0, state.quantity - 1),
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}
const ProductRow = memo(({ product, onPress }: ProductRowProps) => {
  const { colors } = useTheme();
  return (
    <Pressable
      style={[styles.card, { backgroundColor: colors.bg }]}
      onPress={() => onPress(product)}
    >
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.categoryBadge} numberOfLines={1}>
            {product.category.toUpperCase()}
          </Text>
          <Text style={styles.idText}>#{product.id}</Text>
        </View>

        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {product.title}
        </Text>

        <Text
          style={[styles.description, { color: colors.text }]}
          numberOfLines={2}
        >
          {product.description}
        </Text>

        {product.brand ? (
          <Text
            style={[styles.brandText, { color: colors.text }]}
            numberOfLines={1}
          >
            Thương hiệu: <Text style={styles.brandValue}>{product.brand}</Text>
          </Text>
        ) : null}

        <View style={styles.footerRow}>
          <Text style={styles.price}>${product.price.toLocaleString()}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingStar}>★</Text>
            <Text style={styles.ratingText}>{product.rating}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
});

const ProductScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<string>("all");
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const loadData = async (targetPage: number, isRefresh: boolean = false) => {
    if (isRefresh) {
      setRefresh(true);
    } else if (targetPage > 1) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const skip = (targetPage - 1) * LIMIT;
      const res = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`,
      );
      if (!res.ok) {
        throw new Error("Không thể tải danh sách sản phẩm.");
      }
      const data: ProductResponse = await res.json();

      if (targetPage === 1) {
        setProducts(data.products);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
      }
      setTotal(data.total);
      setPage(targetPage);
    } catch (e: any) {
      setError(e.message || "Đã xảy ra lỗi không xác định.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefresh(false);
    }
  };

  useEffect(() => {
    loadData(1);
  }, []);

  const handleRefresh = () => {
    loadData(1, true);
  };

  const handleLoadMore = () => {
    if (loading || refresh || loadingMore) return;
    if (products.length >= total) return;
    loadData(page + 1);
  };
  const categories = useMemo(() => {
    return ["all", ...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    // if (!keyword) return products;
    return products.filter((product) => {
      const matchName = product.title.toLowerCase().includes(keyword);
      const matchCategory = selected === "all" || product.category === selected;
      return matchName && matchCategory;
    });
  }, [products, query, selected]);

  const openDetail = useCallback((product: Product) => {
    Alert.alert(
      product.title,
      `Giá: $${product.price}\n` +
        `Đánh giá: ${product?.rating ?? "Chưa có"}\n` +
        `Hãng: ${product?.brand ?? "Không rõ"}\n\n` +
        `${product?.description ?? ""}`,
    );
  }, []);

  if (loading && page === 1) {
    return (
      <View style={styles.centerStateContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.stateText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (error && products.length === 0) {
    return (
      <View style={styles.centerStateContainer}>
        <Text style={styles.errorTitle}>Đã xảy ra lỗi</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={() => loadData(1)}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductRow product={item} onPress={openDetail} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không tìm thấy sản phẩm nào</Text>
          </View>
        }
        ListHeaderComponent={
          <View>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Tìm theo tên sản phẩm"
            ></TextInput>
            <Text>Số lượng: {state.quantity}</Text>

            <Pressable onPress={() => dispatch({ type: "ADD" })}>
              <Text>Thêm</Text>
            </Pressable>

            <Pressable onPress={() => dispatch({ type: "REMOVE" })}>
              <Text>Giảm</Text>
            </Pressable>

            <Pressable onPress={() => dispatch({ type: "RESET" })}>
              <Text>Reset</Text>
            </Pressable>
            {query.length > 0 && (
              <Pressable onPress={() => setQuery("")}>
                <Text>✕</Text>
              </Pressable>
            )}
            <Pressable onPress={toggleTheme}>
              <Text style={{ color: colors.text }}>
                {isDarkMode ? "☀️ Sáng" : "🌙 Tối"}
              </Text>
            </Pressable>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((category) => (
                <Pressable
                  key={category}
                  onPress={() => setSelected(category)}
                  style={{ margin: 10 }}
                >
                  <Text>{category === "all" ? "Tất cả" : category}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <Text style={{ color: colors.text }}>
              Hiển thị {filteredProducts.length}/{total} sản phẩm
            </Text>
          </View>
        }
        refreshing={refresh}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator></ActivityIndicator>
          ) : products.length >= total && products.length > 0 ? (
            <Text>Đã hiển thị hết sản phẩm</Text>
          ) : null
        }
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: "#f8fafc",
  },
  searchInput: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 15,
    color: "#0f172a",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  image: {
    width: 105,
    height: 105,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
  },
  content: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryBadge: {
    fontSize: 10,
    fontWeight: "700",
    color: "#2563eb",
    backgroundColor: "#eff6ff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    overflow: "hidden",
  },
  idText: {
    fontSize: 11,
    color: "#94a3b8",
    fontWeight: "600",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0f172a",
    marginTop: 4,
  },
  description: {
    fontSize: 12,
    color: "#64748b",
    lineHeight: 16,
    marginTop: 2,
  },
  brandText: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 2,
  },
  brandValue: {
    color: "#475569",
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: "#16a34a",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fefce8",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingStar: {
    fontSize: 12,
    color: "#eab308",
    marginRight: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ca8a04",
  },
  separator: {
    height: 12,
  },
  centerStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 24,
  },
  stateText: {
    marginTop: 12,
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ef4444",
    marginBottom: 6,
  },
  errorMessage: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#94a3b8",
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: "center",
  },
});

export default ProductScreen;
