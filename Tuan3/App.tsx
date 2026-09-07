import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CounterScreen from "./src/pages/CounterScreen";
import HelloScreen from "./src/pages/HelloScreen";
import TimerScreen from "./src/pages/TimerScreen";
import ConnectScreen from "./src/pages/ConnectScreen";
import { useState } from "react";
import HomeScreen, { ThemeContext } from "./src/pages/HomeScreen";
import { UserContext } from "./src/store/UserContext";
import ProfileScreen from "./src/pages/ProfileScreen";
import CartScreen from "./src/pages/CartScreen";
import LoginScreen from "./src/pages/LoginScreen";
import ProductScreen from "./src/pages/ProductScreen";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <CounterScreen/> */}

      {/* <HelloScreen/> */}

      {/* <TimerScreen/> */}

      {/* <ConnectScreen/> */}

      {/* <UserContext.Provider
        value={{
          user: {
            name: "Nguyễn Văn An",
            email: "sadahhd@gmail.com",
            avatar:
              "https://i.pinimg.com/736x/d2/a9/1d/d2a91d4d6e4acd74b7a66cb685e933ab.jpg",
          },
        }}
      >
        <ProfileScreen />
      </UserContext.Provider> */}

      {/* <CartScreen /> */}

      {/* <LoginScreen /> */}

      <ProductScreen />
    </View>
  );
}
// Ví dụ chế độ sáng tối
// export default function App() {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleTheme = () => {
//     setIsDarkMode(previousMode => !previousMode);
//   };

//   return (
//     <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
//       <HomeScreen />
//     </ThemeContext.Provider>
//   );
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
