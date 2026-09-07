import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CounterScreen from './src/pages/CounterScreen';
import HelloScreen from './src/pages/HelloScreen';
import TimerScreen from './src/pages/TimerScreen';
import ConnectScreen from './src/pages/ConnectScreen';
import { useState } from 'react';
import HomeScreen, { ThemeContext } from './src/pages/HomeScreen';
import { UserContext } from './src/store/UserContext';
import ProfileScreen from './src/pages/ProfileScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <CounterScreen/> */}
      {/* <HelloScreen/> */}
      {/* <TimerScreen/> */}
      {/* <ConnectScreen/> */}
      <UserContext.Provider value={{user:{name: 'Nguyễn Văn An' , email:"sadahhd@gmail.com", avatar:"https://www.google.com/imgres?q=psg&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fvi%2Fthumb%2Fa%2Fa7%2FParis_Saint-Germain_F.C..svg%2F1280px-Paris_Saint-Germain_F.C..svg.png%3Futm_source%3Dvi.wikipedia.org%26utm_campaign%3Dindex%26utm_content%3Dthumbnail&imgrefurl=https%3A%2F%2Fvi.wikipedia.org%2Fwiki%2FParis_Saint-Germain_F.C.&docid=a33EjETmBjfsIM&tbnid=97ZA7zEIP6m4-M&vet=12ahUKEwjGv4KL_tuWAxV2nGMGHVnTMkUQnPAOegQIOhAA..i&w=1280&h=1281&hcb=2&ved=2ahUKEwjGv4KL_tuWAxV2nGMGHVnTMkUQnPAOegQIOhAA"}}}>
        <ProfileScreen />
      </UserContext.Provider>

    </View>
  );
}
// Ví dụ chế độ sáng tối
// export default function App() {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleTheme = () => {
//     setIsDarkMode(previousMode => !previousMode);
//   };

//   return (
//     <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
//       <HomeScreen />
//     </ThemeContext.Provider>
//   );
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
