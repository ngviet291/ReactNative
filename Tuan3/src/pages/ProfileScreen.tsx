import React, { useContext } from "react";
import { UserContext } from "../store/UserContext";
import { Button, Image, Text, View } from "react-native";

const ProfileScreen = () => {
  const context = useContext(UserContext);
  const user = context?.user;
  console.log(user?.avatar);
  return (
    <View>
      <Text>{user === null ? "Không có user" : `Xin chào, ${user?.name}`}</Text>
      <Text>Email: {user?.email}</Text>
      {user && (
        <Image
          source={{ uri: user.avatar }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      )}
      <Button title="Đăng xuất"></Button>
    </View>
  );
};

export default ProfileScreen;
