import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BookCardProps } from "../utils/type";
import { useTheme } from "../context/ThemeContext";

const BookCard = ({ book, layout = "row", onSelect }: BookCardProps) => {
  const isTile = layout === "tile";
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[
        isTile ? styles.cardTile : styles.card,
        { backgroundColor: colors.bg },
      ]}
      onPress={() => onSelect(book.id)}
    >
      <View>
        <Image
          style={isTile ? styles.imageTile : styles.image}
          source={{ uri: book.cover }}
        ></Image>
        {isTile && (
          <Text style={[styles.rating, { color: colors.text }]}>
            ⭐{book.rating}
          </Text>
        )}
      </View>
      <View style={styles.info}>
        <Text
          style={{ color: colors.text }}
          numberOfLines={isTile ? 1 : undefined}
        >
          {book.title}
        </Text>
        {!isTile && (
          <>
            <Text style={{ color: colors.text }}>{book.author}</Text>
            <Text style={{ color: colors.text }}>{book.genre}</Text>
            <Text style={{ color: colors.text }}>{book.year}</Text>
          </>
        )}
        <Text style={{ color: colors.text }}>
          {book.isBorrowed ? "📕" : "📗"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 8,
  },
  cardTile: {
    flexDirection: "column",
    width: "49%",
  },
  image: {
    height: 100,
    width: 70,
  },
  imageTile: {
    aspectRatio: 2 / 3,
    width: "100%",
    height: undefined,
  },
  rating: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  info: { flex: 1, padding: 5 },
});
export default memo(BookCard);