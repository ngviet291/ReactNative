import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { Book } from "../utils/type";
import BookCard from "./BookCard";
import { useTheme } from "../context/ThemeContext";

const API_URL = "https://6a0f17221736097c360b2078.mockapi.io/api/v1/Books";
const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [book, setBook] = useState({
    id: "",
    title: "",
    author: "",
    genre: "Hahaha",
    year: 2026,
    rating: 6.1,
    cover: "https://picsum.photos/seed/LJiqth/2187/1623",
    isBorrowed: true,
  });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("");
  const [isTile, setIsTile] = useState(true);
  const [saving, setSaving] = useState(false);
  const { isDark, toggleTheme, colors } = useTheme();
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setBooks(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  const handleSelected = (book: Book) => {
    setSelected(`${book.title}-${book.author}`);
    setBook(book);
    setBooks((prev) =>
      prev.map((b) =>
        b.id === book.id ? { ...b, isBorrowed: !b.isBorrowed } : b,
      ),
    );
  };
  const handleAdd = async () => {
    if (saving) return;
    try {
      setSaving(true);
      const res = await axios.post(API_URL, { ...book });
      setBooks((prev) => [res.data, ...prev]);
    } catch (e) {
      console.log(e);
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    setBook({
      id: "",
      title: "",
      author: "",
      genre: "Hahaha",
      year: 2026,
      rating: 6.1,
      cover: "https://picsum.photos/seed/LJiqth/2187/1623",
      isBorrowed: true,
    });
    setBooks((prev) => prev.filter((b) => b.id != id));
  };
  const handleUpdate = async () => {
    const res = await axios.put(`${API_URL}/${book.id}`, { ...book });
    setBooks((prev) => prev.map((e) => (e.id === book.id ? res.data : e)));
    setBook({
      id: "",
      title: "",
      author: "",
      genre: "Hahaha",
      year: 2026,
      rating: 6.1,
      cover: "https://picsum.photos/seed/LJiqth/2187/1623",
      isBorrowed: true,
    });
  };
  const [searchTitle, setSearchTitle] = useState("");
  const [author, setAuthor] = useState("");
  const authors = [...new Set(books.map((b) => b.author))];
  const [showAuthors, setShowAuthors] = useState(false);
  const filteredBooks = useMemo(() => {
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
        (author === "" || b.author === author),
    );
  }, [books, searchTitle, author]);
  if (loading) {
    return (
      <View>
        <ActivityIndicator size={"large"}></ActivityIndicator>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Text style={{ color: "red" }}>{selected}</Text>
      <Button
        title={isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        onPress={toggleTheme}
      />
      <View>
        <Text style={{ color: colors.text }}>Dạng lưới</Text>
        <Switch value={isTile} onValueChange={setIsTile}></Switch>
      </View>
      <TextInput
        placeholder="Tìm tên sách"
        value={searchTitle}
        onChangeText={setSearchTitle}
      />
      <Pressable onPress={() => setShowAuthors(!showAuthors)}>
        <Text>{author || "Chọn tác giả ▼"}</Text>
      </Pressable>
      {showAuthors &&
        ["All", ...authors].map((name) => (
          <Pressable
            key={name}
            onPress={() => {
              setAuthor(name === "All" ? "" : name);
              setShowAuthors(false);
            }}
          >
            <Text>{name}</Text>
          </Pressable>
        ))}
      <TextInput
        value={book.title}
        placeholder="Nhập tên sách"
        placeholderTextColor={colors.text}
        onChangeText={(item) => setBook((prev) => ({ ...prev, title: item }))}
      />
      <TextInput
        placeholder="Nhập tác giả"
        value={book.author}
        placeholderTextColor={colors.text}
        onChangeText={(item) => setBook((prev) => ({ ...prev, author: item }))}
      />
      <Pressable onPress={handleAdd} disabled={saving} style={styles.btn}>
        {saving ? (
          <ActivityIndicator></ActivityIndicator>
        ) : (
          <Text style={{ color: "white" }}>Thêm sách</Text>
        )}
      </Pressable>
      <Button title="Cập nhật sách" onPress={handleUpdate}></Button>
      <Button title="Xóa sách" onPress={() => handleDelete(book.id)}></Button>
      <FlatList
        data={filteredBooks}
        key={isTile + ""}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            layout={isTile ? "tile" : "row"}
            onSelect={() => handleSelected(item)}
          ></BookCard>
        )}
        numColumns={isTile ? 2 : 1}
        columnWrapperStyle={isTile ? styles.tile : undefined}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  tile: {
    gap: 5,
  },
  btn: {
    backgroundColor: "blue",
    borderRadius: 2,
    borderWidth: 2,
  },
});
export default BookList;
