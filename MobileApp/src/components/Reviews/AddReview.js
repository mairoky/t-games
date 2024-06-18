import React, { useState, useContext } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import * as Location from 'expo-location';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

const AddReview = ({ gameId }) => {
  const [comment, setComment] = useState('');
  const [starRating, setStarRating] = useState(0);
  const { user } = useContext(AuthContext);

  const handleAddReview = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const coordinates = [location.coords.longitude, location.coords.latitude];

    try {
      const response = await axios.post('http://localhost:5000/api/review/create', {
        comment,
        gameId,
        userId: user.id,
        userEmail: user.email,
        starRating,
        location: {
          type: 'Point',
          coordinates,
        },
      });
      console.log('Review added:', response.data);
      setComment('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Comment"
        value={comment}
        onChangeText={setComment}
        style={styles.input}
      />
      <Text>Rating:</Text>
      <StarRating
        rating={starRating}
        onChange={setStarRating}
      />
      <Button mode="contained" onPress={handleAddReview} style={styles.button}>
        Add Review
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default AddReview;
