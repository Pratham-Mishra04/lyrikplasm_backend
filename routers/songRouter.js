import express from 'express'
import { adminOnly, protect } from '../Controllers/authController.js';
import { checkSong, deleteSong, getAllSongs, getSong, markPaid, markUploaded, postSong, requestAccepted, requestRejected, updateSong } from '../controllers/songController.js';
import { joiSongCreateValidator, joiSongUpdateValidator } from '../utils/joiValidators/songValidator.js';
import { discounts, setDueAmount } from '../utils/paymentsHandler.js';

const songRouter = express.Router();

songRouter.route('/')
.get(protect, getAllSongs)
.post(protect, joiSongCreateValidator, setDueAmount, discounts, postSong)

songRouter.route('/:id')
.get(protect, checkSong, getSong)
.patch(protect, joiSongUpdateValidator, checkSong, updateSong)
.delete(protect, deleteSong)

songRouter.post("acceptRequest/:id", protect, adminOnly, checkSong, requestAccepted)
songRouter.post("rejectRequest/:id", protect, adminOnly, checkSong, requestRejected)
songRouter.post("uploaded/:id", protect, adminOnly, checkSong, markUploaded)
songRouter.post("paid/:id", protect, adminOnly, checkSong, markPaid)

export default songRouter;
