const express = require('express');
const reqReceivedLogger = require('../middlewares/reqReceivedLogger');
const { artistValidator } = require('../middlewares/utils/validators');

const { getArtists,
        deleteArtists,
        postArtist,
        getArtist,
        deleteArtist,
        updateArtist, 
        postArtistImage} = require('../controllers/artistController');
const protectedRoute = require('../middlewares/auth');

const router = express.Router();


router.route('/')
      .get(reqReceivedLogger, getArtists)
      .post(reqReceivedLogger, protectedRoute, artistValidator, postArtist)
      .delete(reqReceivedLogger, protectedRoute, deleteArtists)

router.route('/:artistId')
      .get(reqReceivedLogger, getArtist)
      .put(reqReceivedLogger, protectedRoute, updateArtist)
      .delete(reqReceivedLogger, protectedRoute, deleteArtist)

router.route('/:artistId/image')
      .post(reqReceivedLogger, protectedRoute, postArtistImage)


module.exports = router;