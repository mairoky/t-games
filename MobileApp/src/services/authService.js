import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const signIn = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/signin`, { email, password });
  return response.data;
};

export const signUp = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/signup`, { username, email, password });
  return response.data;
};
