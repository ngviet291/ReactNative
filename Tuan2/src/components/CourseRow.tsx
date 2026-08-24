import React from 'react'
import { Course } from '../data/courses'
import { Pressable, StyleSheet, Text, View } from 'react-native'
interface CourseRowProps {
    course:Course,
    onPress: (course:Course) => void
}
const CourseRow = ({course,onPress}:CourseRowProps) => {
  return (
    <Pressable onPress={()=>onPress(course)} style={({pressed})=>[styles.courseCard,pressed && styles.courseCardPressed,]}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.courseInstructor}>Giảng viên: {course.instructor}</Text>
        <View style={styles.courseFooter}>
            <Text style={styles.category}>{course.category}</Text>
            <Text style={styles.studentCount}>
            {course.students} sinh viên
            </Text>
        </View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
    courseCard: {
      padding: 10,
      margin: 5,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
    },
  
    courseCardPressed: {
      backgroundColor: '#eee',
    },
  
    courseTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  
    courseInstructor: {
      fontSize: 14,
      color: 'gray',
    },
  
    courseFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
  
    category: {
      color: 'blue',
    },
  
    studentCount: {
      color: 'gray',
    },
  })
  
export default CourseRow
