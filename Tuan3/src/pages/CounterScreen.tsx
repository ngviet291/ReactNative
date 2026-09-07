import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const CounterScreen = () => {
    const [count, setCount] = useState(0)
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Số lượng :{count}</Text>
        <Button title='Tăng' onPress={()=>setCount(count=>count+1)}/>
        <Button title='Giảm' onPress={()=>setCount(count=>Math.max(0,count-1))}/>
        <Button title='Đặt lại' onPress={()=>setCount(0)}/>
    </View>
  )
}
const styles= StyleSheet.create({
    container: {
        flex: 1,
        gap: 12,
        justifyContent: 'center',
        padding: 24,
      },
      title: {
        fontSize: 24,
        textAlign: 'center',
      },
    
})

export default CounterScreen
