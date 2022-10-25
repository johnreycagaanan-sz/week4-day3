const express = require('express');
const reqReceivedLogger = require('../middlewares/reqReceivedLogger');
const { artistValidator } = require('../middlewares/utils/validators');

const { getArtists,
        deleteArtists,
        postArtist,
        getArtist,
        deleteArtist,
        updateArtist } = require('../controllers/artistController');
const router = express.Router();


router.route('/')
      .get(reqReceivedLogger, getArtists)
      .post(reqReceivedLogger, artistValidator, postArtist)
      .delete(reqReceivedLogger, deleteArtists)

router.route('/:artistId')
      .get(reqReceivedLogger, getArtist)
      .put(reqReceivedLogger, updateArtist)
      .delete(reqReceivedLogger, deleteArtist)

module.exports = router;