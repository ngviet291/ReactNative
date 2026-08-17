import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProfilePage from './src/pages/ProfilePage';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ProfilePage/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
