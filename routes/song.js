const express = require('express');
const reqReceivedLogger = require('../middlewares/reqReceivedLogger');
const { songValidator } = require('../middlewares/utils/validators');

const { getSongs,
        deleteSongs,
        postSong,
        getSong,
        deleteSong,
        updateSong } = require('../controllers/songController');
const router = express.Router();


router.route('/')
      .get(reqReceivedLogger, getSongs)
      .post(reqReceivedLogger, songValidator, postSong)
      .delete(reqReceivedLogger, deleteSongs)

router.route('/:songId')
      .get(reqReceivedLogger, getSong)
      .put(reqReceivedLogger, updateSong)
      .delete(reqReceivedLogger, deleteSong)

module.exports = router;