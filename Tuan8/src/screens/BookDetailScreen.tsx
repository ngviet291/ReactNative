import React, { useEffect, useState } from "react";
import { Button, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import axios from "axios";
import RatingStars from "../components/RatingStars";
import { addReview } from "../services/bookService";

const BookDetailScreen = ({ book, user, navigation }: any) => {
  const [reviews, setReviews] = useState<any[]>(book.reviews ?? []);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("https://6acc3473ef37b15040785e03.mockapi.io/books")
      .then((res) =>
        setRelated(res.data.filter((b: any) => b.category === book.category && b.id !== book.id))
      );
  }, []);

  const average = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      setError("Please select a rating and enter a comment");
      return;
    }
    try {
      const updated = await addReview(
        { ...book, reviews },
        { id: Date.now().toString(), username: user.name, rating, comment }
      );
      setReviews(updated.reviews);
      setRating(0);
      setComment("");
      setError("");
    } catch {
      setError("Failed to submit review");
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>{book.title}</Text>

      <RatingStars value={average} size={24} />
      <Text>{reviews.length ? `${average.toFixed(1)} (${reviews.length} reviews)` : "No reviews yet"}</Text>

      {reviews.map((r) => (
        <View key={r.id} style={styles.review}>
          <Text style={styles.bold}>{r.username}</Text>
          <RatingStars value={r.rating} size={16} />
          <Text>{r.comment}</Text>
        </View>
      ))}

      {user ? (
        <View style={{ marginTop: 20 }}>
          <RatingStars value={rating} size={30} onChange={setRating} />
          <TextInput placeholder="Comment" value={comment} onChangeText={setComment} style={styles.input} />
          {!!error && <Text style={styles.error}>{error}</Text>}
          <Button title="Submit Review" onPress={handleSubmit} />
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Log in to write a review</Text>
      )}

      <Text style={[styles.bold, { marginTop: 30, marginBottom: 10 }]}>Sách liên quan</Text>
      {related.length ? (
        <FlatList
          horizontal
          data={related}
          keyExtractor={(b) => b.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable style={styles.card} onPress={() => navigation.navigate("BookDetail", item)}>
              <Text style={styles.cardText}>{item.title}</Text>
            </Pressable>
          )}
        />
      ) : (
        <Text>No related books</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  review: { borderBottomWidth: 1, borderColor: "#eee", paddingVertical: 10 },
  bold: { fontWeight: "bold" },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
  error: { color: "red", marginBottom: 5 },
  card: { width: 140, padding: 10, marginRight: 10, backgroundColor: "blue", borderRadius: 5 },
  cardText: { color: "white" },
});

export default BookDetailScreen;