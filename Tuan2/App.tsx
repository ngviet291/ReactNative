import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Course, courses } from './src/data/courses';
import CourseListScreen from './src/components/CourseListScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CourseListScreen/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    paddingTop:20
  },
  listContent: {
    flexGrow: 1,
    padding: 20,
  },
 
});

