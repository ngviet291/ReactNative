import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
};

export default function ActionButton({
  label,
  onPress,
  disabled = false,
  variant = 'primary',
}: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        variant === 'primary' ? styles.primary : styles.secondary,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
    >
      <Text
        style={[
          styles.text,
          variant === 'secondary' && styles.secondaryText,
          disabled && styles.disabledText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primary: {
    backgroundColor: '#2f6fed',
  },

  secondary: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2f6fed',
  },

  pressed: {
    opacity: 0.8,
  },

  disabled: {
    backgroundColor: '#e5e7eb',
    borderColor: '#e5e7eb',
  },

  text: {
    color: '#fff',
    fontWeight: 'bold',
  },

  secondaryText: {
    color: '#2f6fed',
  },

  disabledText: {
    color: '#9ca3af',
  },
});