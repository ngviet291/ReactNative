import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import { FlatList, Text, View, StyleSheet } from 'react-native';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const NewfeedScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(api.posts);
        const data = await res.json();
        setPosts(data as Post[]);
      } catch (e) {
        console.log(e);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 16,
  },
});

export default NewfeedScreen;
