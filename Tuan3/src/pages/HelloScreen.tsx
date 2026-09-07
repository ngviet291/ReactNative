import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

const HelloScreen = () => {
    const [fullName, setFullName] = useState('')
    const [age, setAge] = useState("")
    const ageError = age === '' || Number(age) < 18
    const handleClear = () => {
        setFullName('')
        setAge('')  
    }
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder='Nhập họ và tên'></TextInput>
      <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder='Nhập tuổi'></TextInput>
      <Text style={styles.output}>{fullName? `Xin chào,${fullName}!`:"Vui lòng nhập họ và tên"}</Text>
      <Text style={ageError ? styles.error : styles.success}>{age===''?"Vui lòng nhập tuổi":Number(age)<18? `Tuổi nhở hơn 18`:"Tuổi lớn hơn 18"}</Text>
      <Button title='Xóa rỗng' onPress={handleClear}></Button>
    </View>
  )
}

const styles= StyleSheet.create({
    container:{
        flex: 1,
        gap: 12,
        justifyContent: 'center',
        padding: 24,
    },
    input:{
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 12
    },
    output:{
        fontSize: 24,
        textAlign: 'center',
    },
    error:{
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
    },
    success: {
        color: 'green',
        fontSize: 18,
        textAlign: 'center',
      },
})
export default HelloScreen
