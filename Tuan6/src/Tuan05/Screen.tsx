import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";
import CartScreen from "./pages/CartScreen";
import ProfileScreen from "./pages/ProfileScreen";
import BookDetailScreen from "./pages/BookDetailScreen";
import CheckoutScreen from "./pages/CheckoutScreen";


type TabParamList = {
  Home: undefined;
  Category: undefined;
  Cart: undefined;
  Profile: undefined;
};

type HomeStackParamList = {
  HomeScreen: undefined;
  BookDetail: {
    bookId: string;
  };
};
type CartStackParamList = {
  CartScreen: undefined;
  Checkout: {
    totalPrice: number;
  };
};
const Tab =
  createBottomTabNavigator<TabParamList>();

const HomeStack =
  createNativeStackNavigator<HomeStackParamList>();
const CartStack =
  createNativeStackNavigator<CartStackParamList>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <HomeStack.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={{
            title: "Chi tiết sách",
        }}
      />

    </HomeStack.Navigator>
  );
}
function CartStackScreen() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: "Giỏ hàng",
        }}
      />

      <CartStack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          title: "Thanh toán",
        }}
      />
    </CartStack.Navigator>
  );
}



function CustomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused =
          state.index === index;

        let title = "";

        if (route.name === "Home") {
          title = "Home";
        }

        if (route.name === "Category") {
          title = "Danh mục";
        }

        if (route.name === "Cart") {
          title = "Giỏ hàng";
        }

        if (route.name === "Profile") {
          title = "Tài khoản";
        }

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={() =>
              navigation.navigate(route.name)
            }
          >
            <Text
              style={[
                styles.text,
                isFocused &&
                  styles.activeText,
              ]}
            >
              {title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => (
          <CustomTabBar {...props} />
        )}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
        />

        <Tab.Screen
          name="Category"
          component={ProductScreen}
        />

        <Tab.Screen
        name="Cart"
        component={CartStackScreen}
        />


        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 65,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },

  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#888",
  },

  activeText: {
    color: "#007AFF",
    fontWeight: "bold",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
