import React, { memo, useState } from 'react'
import { Movie, MovieCardProps} from '../util/type'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({movie,layout='row',onSelect}:MovieCardProps) => {
  const isTile = layout === 'tile';
  return (
    <TouchableOpacity
      style={[
        styles.container,
        layout === 'tile' && styles.tile,
      ]}
      onPress={()=>onSelect(movie.id)}
    >
      <View style={styles.posterContainer}>
        <Image style={[styles.poster,isTile&&styles.posterTile]} source={{uri:movie.poster}}></Image>
        {isTile && (
          <Text style={styles.ratingBadge}>
          ⭐ {movie.rating}
        </Text>
        )}
      </View>

      <View style={styles.content}>
        <Text numberOfLines={isTile?2:1}>{movie.title}</Text>
        {!isTile && (
          <View>
            <Text>The loai: {movie.genre}</Text>
            <Text>Nam: {movie.year}</Text>
            <Text>⭐{movie.rating}</Text>
          </View>
        )}
        
        <Text>{movie.isWatched?"✅":"⏳"}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles= StyleSheet.create({
  container:{
    flex:1,
    flexDirection:"row",
    backgroundColor: "white",
    padding:10,
    borderWidth:1,
    borderColor:"red"
  },
  posterTile: {
    width: '100%',
    aspectRatio: 2 / 3,
    height: undefined,
  },
  posterContainer: {
    position: 'relative',
  },

  tile: {
    flexDirection: 'column',
    width: 100,
  },
  ratingBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    color: 'white',
    backgroundColor: 'black',
    padding: 3,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  poster: {
    width: 70,
    height: 100,
    borderRadius: 8,
  },
})
export default memo(MovieCard) 
