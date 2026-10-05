import React, { useState } from 'react'
import { Movie, MovieListProps } from '../util/type';
import { FlatList, RefreshControl, Switch, Text, View } from 'react-native';
import MovieItem from './MovieCard';

const MovieList = ({movies,onRefresh,refreshing}:MovieListProps) => {
    const [isTile,setIsTile] = useState(true);
    const handleSelect= (id: string) => {
      const movie = movies.find((item)=> item.id ===id)
      if(movie){
        console.log(movie.id);
      }
    } 
  return (
    <View style={{flex:1}} > 
        <Text>Dang luoi</Text>
        <Switch
        value={isTile}
        onValueChange={setIsTile}
        ></Switch>
        <FlatList style={{flex:1}} data={movies} 
        numColumns={isTile ? 2 : 1}
        key={isTile+""}
        keyExtractor={(item)=>item.id} 
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
        }
        renderItem={({item})=>
        <MovieItem movie={item} layout={isTile?"tile":"row"} onSelect={handleSelect}></MovieItem>}
        />
    </View>
    
      
  )
}

export default MovieList
