import Review from "../models/review.model.js";

export const calculateAverageRating = async (gameId) => {
    try {
      const reviews = await Review.find({ gameId });
      const averageRating = reviews.reduce((acc, review) => acc + review.starRating, 0) / reviews.length || 0;
      return averageRating;
    } catch (error) {
      throw new Error('Error calculating average rating');
    }
  };