// import Review from "../models/review.model.js";

// export const createReview = async (req, res, next) => {
//     try {
//       const { content, postId, userId } = req.body;
  
//       if (userId !== req.user.id) {
//         return next(
//           errorHandler(403, 'You are not allowed to create this review')
//         );
//       }
  
//       const newReview = new Review({
//         content,
//         postId,
//         userId,
//       });
//       await newReview.save();
  
//       res.status(200).json(newReview);
//     } catch (error) {
//       next(error);
//     }
//   };

import Review from '../models/review.model.js';

export const createReview = async (req, res, next) => {
  try {
    const { comment, gameId, userId, userEmail, starRating, location } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandler(403, 'You are not allowed to create this review')
      );
    }

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
    res.status(200).json('Review has been deleted');
  } catch (error) {
    next(error);
  }

}


