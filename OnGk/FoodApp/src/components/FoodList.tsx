import React, { use, useEffect, useMemo, useState } from "react";
import { Food } from "../utils/type";
import axios from "axios";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import FoodCard from "./FoodCard";
const EMPTY_FOOD = {
  id: "",
  name: "",
  category: "",
  price: 822,
  rating: 2,
  image: "https://avatars.githubusercontent.com/u/36373222",
  isFavorite: false,
};
const FoodList = () => {
  const [isTile, setIsTile] = useState(false);
  const API_URL = "https://6acc3473ef37b15040785e03.mockapi.io/Foods";
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [food, setFood] = useState(EMPTY_FOOD);
  const [selected, setSelected] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const catergories = [...new Set(foods.map((f) => f.category))];
  const [showCate, setShowCate] = useState(false);
  const filteredFoods = useMemo(() => {
    return foods.filter(
      (f) =>
        f.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === "" || f.category === category),
    );
  }, [search, category, foods]);
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setFoods(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  const handleSelect = (food: Food) => {
    setSelected(`${food.name}(${food.price})`);
    setFood(food);
    // setIsEdit(true);
    // setVisible(true);
  };
  const handleSave = async () => {
    if (isEdit) {
      const res = await axios.put(`${API_URL}/${food.id}`, { ...food });
      setFoods((prev) => prev.map((e) => (e.id === food.id ? res.data : e)));
    } else {
      const res = await axios.post(API_URL, { ...food });
      setFoods((prev) => [res.data, ...prev]);
    }
    setFood(EMPTY_FOOD);
    setIsEdit(false);
    setVisible(false);
  };
  const handleDelete = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    setFoods((prev) => prev.filter((e) => e.id != id));
  };
  const openAdd = () => {
    setFood(EMPTY_FOOD);
    setIsEdit(false);
    setVisible(true);
  };
  const openEdit = (food: Food) => {
    setFood({ ...food });
    setIsEdit(true);
    setVisible(true);
  };
  if (loading) {
    return (
      <View>
        <ActivityIndicator size={"large"}></ActivityIndicator>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Dạng lưới</Text>
        <Switch value={isTile} onValueChange={setIsTile}></Switch>
      </View>
      <Text style={{ color: "red" }}>{selected}</Text>
      <Modal visible={visible} transparent>
        <View style={styles.overlay}>
          <View style={styles.box}>
            <Text>{isEdit ? "Sửa thức ăn" : "Thêm thức ăn"}</Text>

            <TextInput
              style={styles.input}
              placeholder="Nhập tên thức ăn"
              value={food.name}
              onChangeText={(v) => setFood((prev) => ({ ...prev, name: v }))}
            />

            <View>
              <Button title="Lưu" onPress={handleSave} />
              <Button title="Hủy" onPress={() => setVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
      <Pressable onPress={openAdd}>
        <Text>Thêm thức ăn</Text>
      </Pressable>
      {/* <Pressable onPress={() => openEdit(food)}>
        <Text>Sửa thức ăn</Text>
      </Pressable> */}
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm theo tên"
        value={search}
        onChangeText={setSearch}></TextInput>
      {showCate &&
        ["All", ...catergories].map((name) => (
          <Pressable
            key={name}
            onPress={() => {
              setCategory(name === "All" ? "" : name);
              setShowCate(false);
            }}>
            <Text>{name}</Text>
          </Pressable>
        ))}
      <Pressable style={styles.category} onPress={() => setShowCate(!showCate)}>
        <Text>{category || "Chọn thể loại"}</Text>
      </Pressable>
      <Pressable onPress={() => handleDelete(food.id)}>
        <Text>Xóa thức ăn</Text>
      </Pressable>
      <FlatList
        data={filteredFoods}
        key={isTile + ""}
        numColumns={isTile ? 2 : 1}
        columnWrapperStyle={isTile ? styles.tile : undefined}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodCard
            food={item}
            layout={isTile ? "tile" : "row"}
            onLongPress={openEdit}
            onSelect={handleSelect}></FoodCard>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              (setRefreshing(true), loadData());
            }}
            tintColor="#0000ff"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  category: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginBottom: 10,
  },
  categoryItem: {
    padding: 10,
    backgroundColor: "#DBEAFE",
    marginBottom: 4,
    borderRadius: 6,
  },
  tile: {
    gap: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  box: {
    backgroundColor: "white",
    margin: 24,
    padding: 16,
    borderRadius: 12,
  },
});

export default FoodList;
