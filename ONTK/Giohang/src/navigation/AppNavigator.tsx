import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import BookDetailScreen from "../screens/BookDetailScreen";
import { WishlistScreen } from "../screens/WishlistScreen";
import { Ionicons } from "@expo/vector-icons";
import { Book } from "../type";

export type RootStackParams = {
  Tabs: undefined;
  BookDetail: {
    book: Book;
  };
};
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParams>();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Trang chủ",
          tabBarIcon: () => <Ionicons name="home" size={30}></Ionicons>,
        }}></Tab.Screen>
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "Trang giỏ hàng",
          tabBarIcon: () => <Ionicons name="cart" size={30} />,
        }}></Tab.Screen>
      <Tab.Screen
        name="Wish"
        component={WishlistScreen}
        options={{
          title: "Trang yêu thích",
          tabBarIcon: () => <Ionicons name="heart" size={30}></Ionicons>,
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};
const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
    </Stack.Navigator>
  );
};
export default AppNavigator;
