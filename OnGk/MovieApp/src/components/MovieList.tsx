import React, { useEffect, useState } from "react";
import { Movie } from "../utils/type";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
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
const EMPTY_MOVIE = {
  id: "",
  title: "",
  genre: "",
  year: 2026,
  rating: 3,
  poster: "https://picsum.photos/seed/ejhKxtglx/2618/1110",
  isWatched: true,
};
const MovieList = () => {
  const [layout, setLayout] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState(EMPTY_MOVIE);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const loadData = async (p: number) => {
    try {
      setError(null);
      const res = await axios.get(API_URL, {
        params: { page: p, limit: LIMIT },
      });
      const data: Movie[] = res.data;
      setMovies((prev) => (p === 1 ? data : [...prev, ...data]));
      setPage(p);
      setHasMore(data.length === LIMIT);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefresh(false);
    }
  };
  useEffect(() => {
    loadData(1);
  }, []);
  if (error) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }
  if (loading) {
    return (
      <View>
        <ActivityIndicator size={"large"}></ActivityIndicator>
      </View>
    );
  }
  const openAdd = () => {
    setMovie(EMPTY_MOVIE);
    setIsEdit(false);
    setVisible(true);
  };
  const openEdit = () => {
    if (!movie.id) return;
    setIsEdit(true);
    setVisible(true);
  };
  const handleSave = async () => {
    if (isEdit) {
      const res = await axios.put(`${API_URL}/${movie.id}`, { ...movie });
      setMovies((prev) => prev.map((e) => (e.id === movie.id ? res.data : e)));
    } else {
      const res = await axios.post(API_URL, { ...movie });
      setMovies((prev) => [res.data, ...prev]);
    }
    setMovie(EMPTY_MOVIE);
    setVisible(false);
  };
  // const handleAdd = async () => {
  //   const res = await axios.post(API_URL, { ...movie });
  //   const data = res.data;
  //   setMovies((prev) => [data, ...prev]);
  // };

  // const handleUpdate = async () => {
  //   const res = await axios.put(`${API_URL}/${movie.id}`, { ...movie });
  //   setMovies((prev) => prev.map((e) => (e.id === movie.id ? res.data : e)));
  //   setMovie(EMPTY_MOVIE);
  // };
  const handleDelete = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    setMovie(EMPTY_MOVIE);
    setMovies((prev) => prev.filter((m) => m.id != id));
  };
  const handleLoadMore = () => {
    if (loadingMore || !hasMore || loading) return;
    setLoadingMore(true);
    loadData(page + 1);
  };
  return (
    <View style={{ flex: 1 }}>
      <Switch value={layout} onValueChange={setLayout}></Switch>
      {/* <Text>{selected}</Text> */}
      {/* <TextInput
        placeholder="Nhập tên"
        value={movie.title}
        onChangeText={(item) => setMovie((prev) => ({ ...prev, title: item }))}
      ></TextInput>
      <TextInput
        placeholder="Nhập thể loại"
        value={movie.genre}
        onChangeText={(item) => setMovie((prev) => ({ ...prev, genre: item }))}
      ></TextInput> */}
      <Button title="Thêm phim" onPress={openAdd}></Button>
      <Button title="Sửa phim" onPress={openEdit}></Button>
      <Button title="Xóa phim" onPress={() => handleDelete(movie.id)}></Button>
      <Modal visible={visible} transparent>
        <View style={styles.overlay}>
          <View style={styles.box}>
            <Text>{isEdit ? "Sửa phim" : "Thêm phim"}</Text>
            <TextInput
              placeholder="Nhập tên"
              value={movie.title}
              onChangeText={(t) => setMovie((prev) => ({ ...prev, title: t }))}
            />
            <TextInput
              placeholder="Nhập thể loại"
              value={movie.genre}
              onChangeText={(t) => setMovie((prev) => ({ ...prev, genre: t }))}
            />
            <Button title="Lưu" onPress={handleSave} />
            <Button title="Hủy" onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>
      <FlatList
        data={movies}
        key={layout + ""}
        numColumns={layout ? 2 : 1}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={layout ? styles.tile : undefined}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            layout={layout ? "tile" : "row"}
            onSelect={(m) => {
              setMovie(m);
              setIsEdit(true);
              setVisible(true);
            }}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
        onRefresh={() => {
          setRefresh(true);
          loadData(1);
        }}
        refreshing={refresh}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  tile: {
    gap: 12,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  box: { backgroundColor: "white", margin: 24, padding: 16, borderRadius: 12 },
});
export default MovieList;
