import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
    },
    gameId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    starRating: {
      type: Number,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
