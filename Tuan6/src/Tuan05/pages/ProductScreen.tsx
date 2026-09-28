import React, { memo, useCallback, useMemo, useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

type Product = {
  id: string;
  name: string;
  price: number;
};

type ProductItemProps = {
  item: Product;
  onSelect: (product: Product) => void;
};
const products: Product[] = [
  { id: "1", name: "Áo thun", price: 200000 },
  { id: "2", name: "Quần jean", price: 450000 },
  { id: "3", name: "Giày thể thao", price: 800000 },
];
const ProductItem = memo(function ProductItem({
  item,
  onSelect,
}: ProductItemProps) {
  console.log("ProductItem render:", item.name);
  return (
    <Button
      title={`${item.name} - ${item.price.toLocaleString("vi-VN")}đ`}
      onPress={() => onSelect(item)}
    />
  );
});

export default function ProductScreen() {
  console.log("ProductScreen render");
  const [keyword, setKeyword] = useState("");
  const [selectedName, setSelectedName] = useState("");

  //   const products = useMemo(
  //     () => [
  //       {
  //         id: "1",
  //         name: "Điện thoại",
  //         price: 12000000,
  //       },
  //       {
  //         id: "2",
  //         name: "Máy tính bảng",
  //         price: 9000000,
  //       },
  //       {
  //         id: "3",
  //         name: "Tai nghe",
  //         price: 1500000,
  //       },
  //     ],
  //     [],
  //   );

  const [sortAsc, setSortAsc] = useState(true);
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    return products.filter((product) => {
      const matchKeyword = product.name
        .toLowerCase()
        .includes(normalizedKeyword);
      const matchPrice = maxPrice === "" || product.price < Number(maxPrice);
      return matchKeyword && matchPrice;
    });
  }, [keyword, maxPrice]);
  // ds rút gọn từ ds đã lọc
  const sortedProducts = useMemo(() => {
    const result = [...filteredProducts];

    if (sortAsc) {
      result.sort((a, b) => a.price - b.price);
    } else {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [filteredProducts, sortAsc]);

  const handleSelectProduct = useCallback((product: Product) => {
    setSelectedName(product.name);
  }, []);

  const totalPrice = useMemo(() => {
    return filteredProducts.reduce(
      (total, product) => total + product.price,
      0,
    );
  }, [filteredProducts]);

  return (
    <View style={styles.container}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Tìm sản phẩm"
        style={styles.input}
      />
      <TextInput
        value={maxPrice}
        onChangeText={setMaxPrice}
        placeholder="Giá tối đa"
        keyboardType="numeric"
        style={styles.input}
      />
      <Button
        title={sortAsc ? "Giá tăng dần" : "Giá giảm dần"}
        onPress={() => setSortAsc(!sortAsc)}
      />
      <Text>Sản phẩm đã chọn: {selectedName || "Chưa chọn"}</Text>

      <FlatList
        data={sortedProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem item={item} onSelect={handleSelectProduct} />
        )}
        ListEmptyComponent={<Text>Không tìm thấy sản phẩm</Text>}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Tổng giá: {totalPrice.toLocaleString("vi-VN")}đ
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    padding: 24,
  },

  input: {
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 8,
    padding: 12,
  },
});
