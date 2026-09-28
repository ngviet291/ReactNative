import React, {
  createContext,
  useContext,
} from "react";

import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

type HomeStackParamList = {
  HomeScreen: undefined;
  BookDetail: {
    bookId: string;
  };
};

type HomeScreenNavigationProp =
  NativeStackNavigationProp<
    HomeStackParamList,
    "HomeScreen"
  >;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext =
  createContext<ThemeContextType>(
    {} as ThemeContextType
  );

export default function HomeScreen({
  navigation,
}: HomeScreenProps) {
  const {
    isDarkMode,
    toggleTheme,
  } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? "#222222"
            : "#ffffff",
        },
      ]}
    >
      <Text
        style={[
          styles.modeText,
          {
            color: isDarkMode
              ? "#ffffff"
              : "#222222",
          },
        ]}
      >
        {isDarkMode
          ? "Chế độ tối"
          : "Chế độ sáng"}
      </Text>

      <Button
        title="Đổi giao diện"
        onPress={toggleTheme}
      />

      <TouchableOpacity
        style={styles.bookCard}
        onPress={() =>
          navigation.navigate("BookDetail", {
            bookId: "1",
          })
        }
      >
        <Text style={styles.bookTitle}>
          Sách mẫu
        </Text>

        <Text style={styles.bookPrice}>
          100.000đ
        </Text>

        <Text style={styles.detailText}>
          Nhấn để xem chi tiết
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modeText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  bookCard: {
    width: "90%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#eeeeee",
  },

  bookTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },

  bookPrice: {
    fontSize: 18,
    color: "red",
    marginBottom: 8,
  },

  detailText: {
    color: "#666",
  },
});