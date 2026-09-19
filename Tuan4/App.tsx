import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NewfeedScreen from "./src/bai09/pages/NewfeedScreen";
import UserDetailScreen from "./src/bai10/pages/UserDetailScreen ";
import ProductsSearchScreen from "./src/bai11/pages/ProductsSearchScreen";
import ErrorScreen from "./src/bai12/pages/ErrorScreen";
import ProductsScreen from "./src/bai14/pages/ProductsScreen";
import ProductsListScreen from "./src/bai15/pages/ProductsListScreen";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <NewfeedScreen></NewfeedScreen> */}
      {/* <UserDetailScreen></UserDetailScreen> */}
      {/* <ProductsSearchScreen></ProductsSearchScreen> */}
      <ErrorScreen></ErrorScreen>
      {/* <ProductsScreen></ProductsScreen> */}
      {/* <ProductsListScreen></ProductsListScreen> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
