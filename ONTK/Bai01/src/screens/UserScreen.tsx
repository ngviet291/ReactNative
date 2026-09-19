import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  phone: string;
}

const UserScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const loadUser = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
      );
      if (!res.ok) {
        throw new Error(`Không tìm thấy người dùng`);
      }
      const data = (await res.json()) as User;
      setUser(data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Đã xảy ra lỗi kh xác định");
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadUser(1);
  }, []);
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>{error}</Text>
        <Pressable onPress={() => loadUser(Number(userId) || 1)}>
          Thử lại
        </Pressable>
      </View>
    );
  }
  if (!user) {
    return (
      <View>
        <Text>Chưa có dữ liệu</Text>
        <Text>Nhập ID rồi bấm Tải để xem thông tin.</Text>
      </View>
    );
  }
  return (
    <ScrollView style={{ marginTop: 30 }}>
      <View>
        <TextInput
          value={userId}
          onChangeText={setUserId}
          placeholder="Nhập id"
          keyboardType="number-pad"
        />
        <Pressable onPress={() => loadUser(Number(userId) || 1)}>
          <Text>Tải</Text>
        </Pressable>
        <Field label="Họ tên" value={user?.name} />
        <Field label="Tài khoản" value={user?.username} />
        <Field label="Email" value={user?.email} />
        <Field label="Điện thoại" value={user?.phone} />
        <Field label="Thành phố" value={user?.address?.city} />
        <Field label="Đường" value={user?.address?.street} />
        <Field label="Mã bưu chính" value={user?.address?.zipcode} />
      </View>
    </ScrollView>
  );
};
function Field({ label, value }: { label: string; value?: string }) {
  return (
    <View>
      <Text>{label}</Text>
      <Text>{value ?? "Chưa cập nhật"}</Text>
    </View>
  );
}
export default UserScreen;
