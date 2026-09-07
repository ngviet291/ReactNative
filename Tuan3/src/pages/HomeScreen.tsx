import React, { createContext, useContext, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}
export const ThemeContext = createContext({} as ThemeContextType);

export default function HomeScreen() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#222222' : '#ffffff' },
      ]}
    >
      <Text style={{ color: isDarkMode ? '#ffffff' : '#222222' }}>
        {isDarkMode ? 'Chế độ tối' : 'Chế độ sáng'}
      </Text>

      <Button title="Đổi giao diện" onPress={toggleTheme} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
