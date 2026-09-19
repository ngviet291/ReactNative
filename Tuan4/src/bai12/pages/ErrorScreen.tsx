import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import { Alert, StyleSheet, Text, View } from "react-native";

export type CustomError = {
  message: string;
  status?: number;
  code?: string;
};
const ErrorScreen = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(api.brokenApi);
        const data = await res.json();
        console.log(data);
      } catch (e) {
        const error = e as CustomError;
        Alert.alert("Lỗi Api", error.message || "Lỗi không xác định");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <View style={styles.container}>{loading && <Text>Đang tải...</Text>}</View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "bold" },
});
export default ErrorScreen;
