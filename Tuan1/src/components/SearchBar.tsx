import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder,
}: SearchBarProps) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder || 'Tìm kiếm thông tin...'}
      placeholderTextColor="#9ca3af"
      accessibilityLabel="Ô tìm kiếm thông tin sinh viên"
      accessibilityHint="Nhập từ khóa để tìm thông tin"
      returnKeyType="search"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
    marginTop: 16,
    minHeight: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#1f2937',
  },
});