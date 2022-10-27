const express = require('express');
const reqReceivedLogger = require('../middlewares/reqReceivedLogger');
const { songValidator } = require('../middlewares/utils/validators');

const { getSongs,
        deleteSongs,
        postSong,
        getSong,
        deleteSong,
        updateSong,
        getSongRatings,
        postSongRating,
        deleteSongRatings,
        getSongRating,
        updateSongRating,
        deleteSongRating } = require('../controllers/songController');
const protectedRoute = require('../middlewares/auth');
const router = express.Router();


router.route('/')
      .get(reqReceivedLogger, getSongs)
      .post(reqReceivedLogger, protectedRoute, songValidator, postSong)
      .delete(reqReceivedLogger, protectedRoute, deleteSongs)

router.route('/:songId')
      .get(reqReceivedLogger, getSong)
      .put(reqReceivedLogger, protectedRoute, updateSong)
      .delete(reqReceivedLogger, protectedRoute, deleteSong)

router.route('/:songId/ratings')
      .get(reqReceivedLogger, getSongRatings)
      .post(reqReceivedLogger, postSongRating)
      .delete(reqReceivedLogger, deleteSongRatings)

router.route('/:songId/ratings/:ratingId')
      .get(reqReceivedLogger, getSongRating)
      .put(reqReceivedLogger, updateSongRating)
      .delete(reqReceivedLogger, deleteSongRating)

module.exports = router;