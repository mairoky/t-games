
import Review from '../models/review.model.js';
import { calculateAverageRating } from '../utils/calculateAverageRating.js';

export const createReview = async (req, res, next) => {
  try {
    const { comment, gameId, userId, userEmail, starRating, location } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, 'You are not allowed to create this review')
      );
    }

    // Recalculate the average rating after adding the new review
    const averageRating = await calculateAverageRating(gameId);

    const newReview = new Review({
      comment,
      gameId,
      userId,
      userEmail,
      starRating,
      location: {
        type: 'Point',
        coordinates: location.coordinates
      }
    });

    await newReview.save();

    res.status(200).json(newReview);
  } catch (error) {
    next(error);
  }
};

// Get Reviews

export const getGameReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gameId: req.params.gameId }).sort({
      createdAt: -1,
    });
    
    // Calculate the average rating
    const averageRating = await calculateAverageRating(req.params.gameId);

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

// Like Review

export const likeReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return next(errorHandler(404, 'Review not found'));
    }
    const userIndex = review.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      review.numberOfLikes += 1;
      review.likes.push(req.user.id);
    } else {
      review.numberOfLikes -= 1;
      review.likes.splice(userIndex, 1);
    }
    await review.save();
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

// Edit Review
export const editReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return next(errorHandler(404, 'Review not found'));
    }
    if (review.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to edit this review'));
    }
    // Recalculate the average rating after editing the review
    const averageRating = await calculateAverageRating(review.gameId);

    const editedReview = await Review.findByIdAndUpdate(
      req.params.reviewId,
      {
        comment: req.body.comment,
        starRating: req.body.starRating,
      },
      { new: true }
    );
    res.status(200).json(editedReview)
  } catch (error) {
    next(error);
  }
}

// Delete Review
export const deleteReview = async (req, res, next) => {

  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      return next(errorHandler(404, 'Review not found'));
    }
    if (review.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to delete this review'));
    }
    await Review.findByIdAndDelete(req.params.reviewId);
    // Recalculate the average rating after deleting the review
    const averageRating = await calculateAverageRating(review.gameId);
    res.status(200).json('Review has been deleted');
  } catch (error) {
    next(error);
  }

}

// Get Reviews
export const getReviews = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(errorHandler(403, 'You are not allowed to get all reviews'));
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'desc' ? -1 : 1;
    const reviews = await Review.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalReviews = await Review.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthReviews = await Review.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ reviews, totalReviews, lastMonthReviews });
  } catch (error) {
    next(error);
  }
};

export const getReviewLocations = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to access this resource'));
  }
  try {
    const reviews = await Review.find().select('location');
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};


