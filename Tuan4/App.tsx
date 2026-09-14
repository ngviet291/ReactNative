import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NewfeedScreen from './src/bai09/pages/NewfeedScreen';
import UserDetailScreen from './src/bai10/pages/UserDetailScreen ';
import ProductsSearchScreen from './src/bai11/pages/ProductsSearchScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <NewfeedScreen></NewfeedScreen> */}
      {/* <UserDetailScreen></UserDetailScreen> */}
      <ProductsSearchScreen></ProductsSearchScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
