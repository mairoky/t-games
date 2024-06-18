import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import ReviewList from '../Reviews/ReviewList';
import AddReview from '../Reviews/AddReview';

const GameDetail = ({ route }) => {
  const { gameId } = route.params;
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/game/getgames?gameId=${gameId}`);
        setGame(response.data.games[0]);
      } catch (error) {
        console.error('Error fetching game:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameId]);

  if (loading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  if (!game) {
    return (
      <View style={styles.container}>
        <Text>Game not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={{ uri: game.image }} style={styles.image} />
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.content}>{game.content}</Text>
        <AddReview gameId={gameId} />
        <ReviewList gameId={gameId} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    scrollViewContent: {
        flexGrow: 1,
        padding: 16,
      },
      image: {
        width: '100%',
        height: 200,
      },
      title: {
        marginTop: 8,
        fontSize: 24,
      },
      content: {
        marginTop: 8,
        fontSize: 16,
      },
      loading: {
        flex: 1,
        justifyContent: 'center',
      },
});

export default GameDetail;
