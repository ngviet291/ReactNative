import React, { useState } from 'react'
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

import { Course, courses } from '../data/courses'
import CourseRow from './CourseRow'

const CourseListScreen = () => {
  const [query, setQuery] = useState('')

  const openCourse = (course: Course) => {
    Alert.alert(
      course.title,
      `Giảng viên: ${course.instructor}\nSố lượng sinh viên: ${course .students}`
    )
  }

  const normalizedQuery = query.trim().toLocaleLowerCase('vi')

  const filteredCourses = courses.filter((course) =>
    `${course.title} ${course.instructor} ${course.category}`
      .toLocaleLowerCase('vi')
      .includes(normalizedQuery)
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseRow
            course={item}
            onPress={openCourse}
          />
        )}
        ListHeaderComponent={
            <View style={styles.header}>
            <Text style={styles.screenTitle}>Course Catalog</Text>
      
            <Text style={styles.subtitle}>
              Khám phá các khóa học đang mở
            </Text>
      
            <TextInput  
              value={query}
              onChangeText={setQuery}
              placeholder="Tìm kiếm khóa học..."
              style={styles.searchInput}
            />
            {query.length > 0 && (
                <Pressable
                onPress={() => setQuery('')}
                style={styles.clearButton}
                >
                <Text style={styles.clearText}>✕</Text>
                </Pressable>
            )}
            <Text style={styles.resultText}>
              Tìm thấy {filteredCourses.length} khóa học
            </Text>
          </View>
        }
        ListEmptyComponent={
            <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
            Không tìm thấy khóa học
            </Text>
        
            <Text style={styles.emptyText}>
            Hãy thử tìm kiếm bằng một từ khóa khác.
            </Text>
        </View>
        }   
        ItemSeparatorComponent={() => (
            <View style={styles.separator} />
          )}          
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 250,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: '#182035',
    fontSize: 19,
    fontWeight: '700',
  },
  emptyText: {
    color: '#747B88',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  header: {
    marginBottom: 20,
  },
  screenTitle: {
    color: '#182035',
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    color: '#697080',
    fontSize: 15,
    marginTop: 6,
    marginBottom: 20,
  },
  
  resultText: {
    color: '#4E5665',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
  },
  
  category: {
    overflow: 'hidden',
    color: '#3157A4',
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: '#E8F0FF',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  studentCount: {
    color: '#596171',
    fontSize: 13,
  },
  searchInput: {
    minHeight: 52,
    color: '#182035',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE1E8',
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  separator: {
    height: 12,
  },
  clearButton: {
    padding: 5,
  },
  
  clearText: {
    color: 'gray',
    fontSize: 18,
  },
    
})

export default CourseListScreen
