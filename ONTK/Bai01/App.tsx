import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ProductScreen from "./src/screens/ProductScreen";
import UserScreen from "./src/screens/UserScreen";
import { ThemeProvider } from "./src/context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        {/* <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" /> */}
        <ProductScreen></ProductScreen>
        {/* <UserScreen></UserScreen> */}
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
