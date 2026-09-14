import React, { useEffect, useState } from 'react'
import { api } from '../../api/api';
import { StyleSheet, Text, View } from 'react-native';

export type User ={
    id:number,
    name :string,
    username:string,
    email:string
}
const UserDetailScreen  = () => {
    const [user, setUser]= useState<User|null>(null);
    useEffect(() => {
      const fetchUser= async() => {
        try{
            const res = await fetch(api.users("2"));
            const data = await res.json(); 
            setUser(data as User);
        }catch(e){
            console.log(e);
        }
      }
      fetchUser();
    },[])
    return (
        <View style={styles.container}>
          {user && (
            <View>
              <Text style={styles.name}>{user?.name}</Text>
              <Text style={styles.text}>{user?.username}</Text>
              <Text style={styles.text}>{user?.email}</Text>
            </View>
          )}
        </View>
      );
}
const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 16,
      marginTop: 10,
    },
  });

export default UserDetailScreen 
