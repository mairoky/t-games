import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createReview, getGameReviews, likeReview, editReview, deleteReview } from '../controllers/review.controller.js';

const router = express.Router();


router.post('/create', verifyToken, createReview);
router.get('/getGameReviews/:gameId', getGameReviews);
router.put('/likeReview/:reviewId', verifyToken, likeReview);
router.put('/editReview/:reviewId', verifyToken, editReview);
router.delete('/deleteReview/:reviewId', verifyToken, deleteReview);


export default router;