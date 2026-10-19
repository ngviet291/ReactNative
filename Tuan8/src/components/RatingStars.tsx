import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  value: number;
  size?: number;
  onChange?: (v: number) => void;
};

const RatingStars = ({ value, size = 20, onChange }: Props) => {
  const rounded = Math.round(value);
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const star = (
          <Text style={{ fontSize: size, color: i <= rounded ? "#f5a623" : "#ccc" }}>★</Text>
        );
        return onChange ? (
          <Pressable key={i} onPress={() => onChange(i)}>{star}</Pressable>
        ) : (
          <View key={i}>{star}</View>
        );
      })}
    </View>
  );
};

export default RatingStars;