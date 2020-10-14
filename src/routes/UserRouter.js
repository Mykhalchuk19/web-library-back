const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { UserController } = require('../controllers');
const { UserMiddleware } = require('../middlewares');

const { updateUser } = UserController;
const { updateUserMiddleware } = UserMiddleware;
router.put('/:id', jsonParser, updateUserMiddleware, updateUser);

module.exports = router;
