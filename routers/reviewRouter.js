import express from 'express'
import { adminOnly, protect } from '../Controllers/authController';
import { checkReview, deleteReview, getAllReviews, getReview, markAnswered, markClosed, postReview, updateReview } from '../controllers/reviewController';
import { joiReviewCreateValidator } from '../utils/joiValidators/reviewValidator';

const reviewRouter = express.Router();

reviewRouter.route('/')
.get(protect, getAllReviews)
.post(protect, joiReviewCreateValidator, postReview)

reviewRouter.route('/:id')
.get(protect, checkReview, getReview)
.patch(protect, checkReview, updateReview)
.delete(protect, deleteReview)

reviewRouter.post("answered/:id", protect, adminOnly, checkReview, markAnswered)
reviewRouter.post("closed/:id", protect, adminOnly, checkReview, markClosed)

export default reviewRouter;
