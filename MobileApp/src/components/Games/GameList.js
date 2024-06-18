import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';

const GameList = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/game/getgames');
        setGames(response.data.games);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const renderGame = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('GameDetail', { gameId: item._id })}>
      <View style={styles.gameContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  return (
    <FlatList
      data={games}
      renderItem={renderGame}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  gameContainer: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    marginTop: 8,
    fontSize: 18,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default GameList;
