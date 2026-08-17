import React from 'react';
import { Image, StyleSheet } from 'react-native';

type AvatarProps = {
  uri: string;
  label?: string;
};

const AVATAR_SIZE = 64;

export default function Avatar({ uri, label }: AvatarProps) {
  return (
    <Image
      source={{ uri }}
      style={styles.avatar}
      resizeMode="cover"
      accessible
      accessibilityRole="image"
      accessibilityLabel={label || 'Ảnh đại diện sinh viên'}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#eaf1ff',
  },
});