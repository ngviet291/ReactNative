import React, { memo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ProductRowProps } from "../types";

const ProductRow = memo(({ product, onPress, onDelete }: ProductRowProps) => {
  return (
    <Pressable style={styles.card} onPress={() => onPress(product)}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>

      {/* stopPropagation: bấm Xóa không kích hoạt luôn onPress mở chi tiết */}
      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          onDelete(product);
        }}
        hitSlop={8}
        style={styles.deleteBtn}
      >
        <Text style={styles.deleteText}>Xóa</Text>
      </Pressable>
    </Pressable>
  );
});

export default ProductRow;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 10,
  },
  image: { width: 60, height: 60, borderRadius: 8, backgroundColor: "#f1f5f9" },
  content: { flex: 1, marginLeft: 12 },
  title: { fontSize: 15, fontWeight: "600", color: "#0f172a" },
  category: { fontSize: 12, color: "#64748b", marginTop: 2 },
  price: { fontSize: 14, fontWeight: "700", color: "#16a34a", marginTop: 4 },
  deleteBtn: {
    backgroundColor: "#fef2f2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteText: { color: "#ef4444", fontWeight: "600", fontSize: 13 },
});