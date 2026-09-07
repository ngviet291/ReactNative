import React, { use, useEffect, useState } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native';

const ConnectScreen = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [message, setMessage] = useState('Chưa kết nối');
    const [lastConnected, setLastConnected] = useState('Chưa có')
    useEffect(() => {
        if(isConnected){
            setMessage('Đã kết nối')
            setLastConnected(new Date().toLocaleTimeString())
        }else{
            setMessage('Chưa kết nối')
        }
    },[isConnected])
  return (
    <View>
        <Switch value={isConnected} onValueChange={setIsConnected}></Switch>
        <Text style={isConnected?styles.connected: styles.disconnected}>{message}</Text>
        <Text>Thời gian kết nối lần cuối: {lastConnected}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 15,
    },
  
    connected: {
      color: 'green',
      fontSize: 20,
    },
  
    disconnected: {
      color: 'red',
      fontSize: 20,
    },
  })
export default ConnectScreen
