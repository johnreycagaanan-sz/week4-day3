const express = require('express');
const reqReceivedLogger = require('../middlewares/reqReceivedLogger');
const { userValidator, adminValidator } = require('../middlewares/utils/validators');

const { getUsers,
        deleteUsers,
        postUser,
        getUser,
        deleteUser,
        updateUser } = require('../controllers/userController');
const router = express.Router();


router.route('/')
      .get(reqReceivedLogger,adminValidator, getUsers)
      .post(reqReceivedLogger, userValidator, postUser)
      .delete(reqReceivedLogger, deleteUsers)

router.route('/:userId')
      .get(reqReceivedLogger, getUser)
      .put(reqReceivedLogger, updateUser)
      .delete(reqReceivedLogger, deleteUser)

module.exports = router;