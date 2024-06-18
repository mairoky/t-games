import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const addReview = async (reviewData) => {
  const response = await axios.post(`${API_URL}/api/review/create`, reviewData);
  return response.data;
};

export const getGameReviews = async (gameId) => {
  const response = await axios.get(`${API_URL}/api/review/getGameReviews/${gameId}`);
  return response.data;
};
