import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from "react-redux";
import { setCart, setWishlist, store } from "./src/store/store";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  useEffect(() => {
    AsyncStorage.getItem("data").then((v) => {
      if (v) {
        const d = JSON.parse(v);
        store.dispatch(setCart(d.cart));
        store.dispatch(setWishlist(d.wishlist));
      }
      store.subscribe(() =>
        AsyncStorage.setItem("data", JSON.stringify(store.getState())),
      );
    });
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Provider store={store}>
          <NavigationContainer>
            <AppNavigator></AppNavigator>
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
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
