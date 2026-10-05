import React, { useEffect, useState } from 'react';
import { ActivityIndicator,  StyleSheet, Switch, Text, View } from 'react-native';
import { Movie } from '../util/type';
import MovieList from '../components/MovieList';
import { SafeAreaView } from 'react-native-safe-area-context';
const API_URL= "https://6a0f17221736097c360b2078.mockapi.io/api/v1/Movies"
const HomeScreen = () => {
  const [movies,setMovies]= useState<Movie[]>([])
  const [loading,setLoading] = useState(false)
  const [refreshing,setRefreshing]= useState(false)
  const fetchData= async() => {
    try{
      setRefreshing(true);
      setLoading(true);
      const res = await fetch(API_URL)
      const data = await res.json()
      setMovies(data);
    }
    catch(e){
      console.log(e);
    }
    finally{
      setRefreshing(false)
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchData()
  },[])
  if(loading  && movies.length === 0){
    return(
    <View style={styles.container} >
      <ActivityIndicator style={{marginTop:300}} size="large"></ActivityIndicator>
    </View>
    )
  }
  return (
      <View style={styles.container}>
        <Text style={styles.title}>Movie App</Text>
        <MovieList onRefresh={fetchData} refreshing={refreshing} movies={movies}/>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign:"center",
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
