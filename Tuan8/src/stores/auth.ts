import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveAuth(token: string, user: object) {
  await AsyncStorage.setItem("token", token);
  await AsyncStorage.setItem("user", JSON.stringify(user));
}

export async function getAuth() {
  const token = await AsyncStorage.getItem("token");
  const user = await AsyncStorage.getItem("user");
  return {
    token,
    user: user ? JSON.parse(user) : null,
  };
}

export async function clearAuth() {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
}