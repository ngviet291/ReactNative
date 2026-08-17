import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type InfoCardProps = {
  title: string;
  rows: {
    label: string;
    value: string;
  }[];
};

export default function InfoCard({ title, rows }: InfoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      {rows.map((item) => (
        <Text key={item.label} style={styles.row}>
          <Text style={styles.label}>{item.label}: </Text>
          {item.value}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 15,
    backgroundColor: '#eef4ff',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    marginTop: 3,
  },
  label: {
    fontWeight: 'bold',
  },
});