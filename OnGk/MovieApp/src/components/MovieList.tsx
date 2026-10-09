import React, { useEffect, useState } from "react";
import { Movie } from "../utils/type";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import MovieCard from "./MovieCard";
import axios from "axios";
const API_URL = "https://6a0f17221736097c360b2078.mockapi.io/api/v1/Movies";
const LIMIT = 9;
const MovieList = () => {
  const [layout, setLayout] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState({
    id: "",
    title: "",
    genre: "",
    year: 2026,
    rating: 3,
    poster: "https://picsum.photos/seed/ejhKxtglx/2618/1110",
    isWatched: true,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [refresh, setRefresh] = useState(false);
  const loadData = async (page: number) => {
    try {
      setError(null);
      setLoading(true);
      //limit bao nhieu page nao
      const res = await axios.get(API_URL, {
        params: { page: page, limit: LIMIT },
      });
      const data = res.data;
      setMovies(data);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setRefresh(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData(3);
  }, []);
  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }
  if (loading || movies.length == 0) {
    return (
      <View>
        <ActivityIndicator size={"large"}></ActivityIndicator>
      </View>
    );
  }
  const handleAdd = async () => {
    const res = await axios.post(API_URL, { ...movie });
    const data = res.data;
    setMovies((prev) => [data, ...prev]);
  };
  const handleUpdate = async () => {
    const res = await axios.put(`${API_URL}/${movie.id}`, { ...movie });
    setMovies((prev) => prev.map((e) => (e.id === movie.id ? res.data : e)));
    setMovie({
      id: "",
      title: "",
      genre: "",
      year: 2026,
      rating: 3,
      poster: "https://picsum.photos/seed/ejhKxtglx/2618/1110",
      isWatched: true,
    });
  };
  const handleDelete = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    setMovie({
      id: "",
      title: "",
      genre: "",
      year: 2026,
      rating: 3,
      poster: "https://picsum.photos/seed/ejhKxtglx/2618/1110",
      isWatched: true,
    });
    setMovies((prev) => prev.filter((m) => m.id != movie.id));
  };
  return (
    <View style={{ flex: 1 }}>
      <Switch value={layout} onValueChange={setLayout}></Switch>
      {/* <Text>{selected}</Text> */}
      <TextInput
        placeholder="Nhập tên"
        value={movie.title}
        onChangeText={(item) =>
          setMovie((prev) => ({ ...prev, title: item }))
        }></TextInput>
      <TextInput
        placeholder="Nhập thể loại"
        value={movie.genre}
        onChangeText={(item) =>
          setMovie((prev) => ({ ...prev, genre: item }))
        }></TextInput>
      <Button title="Thêm phim" onPress={handleAdd}></Button>
      <Button title="Sửa phim" onPress={handleUpdate}></Button>
      <Button title="Xóa phim" onPress={() => handleDelete(movie.id)}></Button>
      <FlatList
        data={movies}
        key={layout + ""}
        numColumns={layout ? 2 : 1}
        onRefresh={() => {
          setRefresh(true);
          loadData(1);
        }}
        refreshing={refresh}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={layout ? styles.tile : undefined}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            layout={layout ? "tile" : "row"}
            onSelect={setMovie}></MovieCard>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  tile: {
    gap: 12,
  },
});
export default MovieList;
