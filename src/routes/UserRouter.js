const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { UserController } = require('../controllers');
const { AuthMiddleware, UserMiddleware } = require('../middlewares');

const { createUser, authenticateUser, updateUser } = UserController;
const { createUserMiddleware, authUserMiddleware } = AuthMiddleware;
const { updateUserMiddleware } = UserMiddleware;

router.post('/signup', jsonParser, createUserMiddleware, createUser);
router.post('/signin', jsonParser, authUserMiddleware, authenticateUser);
router.put('/:id', jsonParser, updateUserMiddleware, updateUser);

module.exports = router;
