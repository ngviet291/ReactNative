import React, { memo } from "react";
import { FoodCardProps } from "../utils/type";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FoodCard = ({
  food,
  layout = "row",
  onSelect,
  onLongPress,
}: FoodCardProps) => {
  const isTile = layout === "tile";
  return (
    <TouchableOpacity
      style={isTile ? styles.cardTile : styles.card}
      onPress={() => onSelect(food)}
      onLongPress={() => onLongPress(food)}>
      <View>
        <Image
          style={isTile ? styles.imageTile : styles.image}
          source={{ uri: food.image }}></Image>
        {isTile && <Text style={styles.rating}>⭐{food.rating}</Text>}
      </View>
      <View style={styles.info}>
        <Text numberOfLines={isTile ? 1 : undefined}>{food.name}</Text>

        {!isTile && (
          <>
            <Text>{food.category}</Text>
            <Text>{food.price}</Text>
          </>
        )}

        {food.isFavorite ? <Text>❤️</Text> : <Text>🤍</Text>}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: { flexDirection: "row", padding: 8 },
  cardTile: { flexDirection: "column", width: "49%" },
  image: { height: 100, width: 70 },
  imageTile: { aspectRatio: 2 / 3, width: "100%", height: undefined },
  rating: { position: "absolute", top: 5, right: 5 },
  info: { flex: 1, padding: 5 },
});
export default memo(FoodCard);
