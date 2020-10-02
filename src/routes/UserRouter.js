const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { UserController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

const { createUser, authenticateUser } = UserController;
const { createUserMiddleware, authUserMiddleware } = AuthMiddleware;

router.post('/signup', jsonParser, createUserMiddleware, createUser);
router.post('/signin', jsonParser, authUserMiddleware, authenticateUser);

module.exports = router;
