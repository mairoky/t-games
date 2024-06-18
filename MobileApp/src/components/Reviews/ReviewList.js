import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';

const ReviewList = ({ gameId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/review/getGameReviews/${gameId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [gameId]);

  const renderReview = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Text style={styles.username}>{item.userId}</Text>
      <Text style={styles.comment}>{item.comment}</Text>
      <Text style={styles.rating}>Rating: {item.starRating}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  return (
    <FlatList
      data={reviews}
      renderItem={renderReview}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  reviewContainer: {
    marginBottom: 16,
  },
  username: {
    fontWeight: 'bold',
  },
  comment: {
    marginTop: 4,
  },
  rating: {
    marginTop: 4,
    fontStyle: 'italic',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ReviewList;
