import React, { useContext } from 'react'
import { UserContext } from '../store/UserContext';
import { Image, Text, View } from 'react-native';

const ProfileScreen = () => {
    const context = useContext(UserContext);
    const user = context?.user;
  return (
    <View>
      <Text>{user===null?"Không có user":`Xin chào, ${user?.name}`}</Text>
      <Text>Email: {user?.email}</Text>
      {user && (
        <Image
            source={{ uri: user.avatar }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
        />
     )}
    </View>
  )
}

export default ProfileScreen
