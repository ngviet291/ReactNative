import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Header from '../components/Header'
import StudentInfo from '../components/StudentInfo'
import SearchField from '../components/SearchBar';
import SearchBar from '../components/SearchBar';
import InfoCard from '../components/InfoCard';
import ActionButton from '../components/ActionButton';

const STUDENT = {
  name: 'Nguyễn Minh Anh',
  studentId: '24CNTT001',
  email: 'minhanh@sv.edu.vn',
  className: 'CNTT-K24',
  avatarUri: "assets/icon.png",
};

export default function ProfilePage() {
    const [search, setSearch] = useState('');
  return (
    <View style={styles.container}>
        <Header title={"Smart Campus"}/>
        <ScrollView style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
      >
        <StudentInfo avatarUri={STUDENT.avatarUri}
          name={STUDENT.name}
          studentId={STUDENT.studentId}
        />
        <SearchBar value={search} onChangeText={setSearch} placeholder="Tìm kiếm thông tin..."/>
        <InfoCard title="Thông tin sinh viên"
            rows={[
                { label: 'Email', value: 'minhanh@sv.edu.vn' },
                { label: 'Lớp', value: 'CNTT-K24' },
            ]}
        />
        <ActionButton label="LƯU HỒ SƠ" onPress={() => console.log('Đã lưu')}/>
        <ActionButton label="HỦY" variant="secondary" onPress={() => console.log('Hủy')}/>
        <ActionButton label="VÔ HIỆU HÓA" disabled onPress={() => {}}
        />
      </ScrollView>
      
    </View>
  )
}
const styles= StyleSheet.create({
    container:{
        flex:1
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 24,
    },
    actions: {
        marginHorizontal: 20,
        marginTop: 20,
    },
})
