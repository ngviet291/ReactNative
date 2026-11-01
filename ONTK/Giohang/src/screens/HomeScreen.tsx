import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { Book } from "./../type";
import axios from "axios";
import BookCard from "../components/BookCard";

const HomeScreen = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const loadData = async () => {
    const res = await axios.get<Book[]>("http://localhost:3000/books");
    setBooks(res.data);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={books}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => <BookCard book={item}></BookCard>}
      />
    </View>
  );
};

export default HomeScreen;
