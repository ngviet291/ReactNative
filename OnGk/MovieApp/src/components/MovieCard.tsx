import React, { memo } from "react";
import { MovieCardProps } from "../utils/type";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({ movie, layout = "row", onSelect }: MovieCardProps) => {
  const isTile = layout === "tile";
  return (
    <TouchableOpacity
      style={isTile ? styles.tile : styles.card}
      onPress={() => onSelect(movie)}>
      <View>
        <Image
          style={[styles.image, isTile && styles.tileImage]}
          source={{ uri: movie.poster }}></Image>
        {isTile && <Text style={styles.rating}>⭐{movie.rating}</Text>}
      </View>
      <View style={styles.info}>
        <Text numberOfLines={isTile ? 1 : undefined}>{movie.title}</Text>
        {!isTile && (
          <>
            <Text>{movie.genre}</Text>
            <Text>{movie.year}</Text>
            <Text>⭐{movie.rating}</Text>
          </>
        )}
        <Text>{movie.isWatched ? "✅" : "⏳"}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 100,
  },
  card: {
    flexDirection: "row",
    padding: 10,
  },
  tile: {
    flexDirection: "column",
    width: "48%",
  },
  tileImage: {
    width: "100%",
    aspectRatio: 2 / 3,
    height: undefined,
  },
  info: { flex: 1, padding: 5 },
  rating: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});
export default memo(MovieCard);
