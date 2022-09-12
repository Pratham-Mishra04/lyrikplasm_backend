import express from 'express'
import { adminOnly, protect } from '../Controllers/authController.js';
import { checkReview, deleteReview, getAllReviews, getReview, markAnswered, markClosed, postReview, resizeCover, updateReview } from '../controllers/reviewController.js';
import { joiReviewCreateValidator } from '../utils/joiValidators/reviewValidator.js';
import reviewUploadParserer from '../utils/parserers/reviewUploadParserer.js';

const reviewRouter = express.Router();

reviewRouter.route('/')
.get(protect, getAllReviews)
.post(protect, reviewUploadParserer, joiReviewCreateValidator, resizeCover, postReview)

reviewRouter.route('/:id')
.get(protect, checkReview, getReview)
.patch(protect, checkReview, updateReview)
.delete(protect, deleteReview)

reviewRouter.post("answered/:id", protect, adminOnly, checkReview, markAnswered)
reviewRouter.post("closed/:id", protect, adminOnly, checkReview, markClosed)

export default reviewRouter;
