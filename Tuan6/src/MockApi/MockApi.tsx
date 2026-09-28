import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const API_URL =
  "https://6a0f17221736097c360b2078.mockapi.io/api/v1/products";

export interface Products {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
}

export default function MockApi() {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,setError]= useState("");
  const getProducts = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Loi khi goi API");
      }

      const data = (await response.json())as Products[];

      setProducts(data);
    } catch (error) {
      console.log("Error:", error);
      setError("Co loi xay ra");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="blue" />
        <Text>Dang tai du lieu...</Text>
      </View>
    );
  }
  
  return (
  <View style={styles.container}>
    <Text style={styles.title}>Danh sach san pham</Text>

    {error ? (
      <View>
        <Text>Co loi xay ra</Text>
      </View>
    ) : (
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Price: ${item.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text style={styles.description}>
              {item.description}
            </Text>
          </View>
        )}
      />
    )}
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  item: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  description: {
    marginTop: 5,
    color: "#666",
  },
});
