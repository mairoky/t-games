import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getGames = async () => {
  const response = await axios.get(`${API_URL}/api/game/getgames`);
  return response.data.games;
};

export const getGame = async (gameId) => {
  const response = await axios.get(`${API_URL}/api/game/getgames?gameId=${gameId}`);
  return response.data.games[0];
};
