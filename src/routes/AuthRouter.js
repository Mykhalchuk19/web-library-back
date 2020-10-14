const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { AuthController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

const { createUser, authenticateUser } = AuthController;
const { createUserMiddleware, authUserMiddleware } = AuthMiddleware;

router.post('/signup', jsonParser, createUserMiddleware, createUser);
router.post('/signin', jsonParser, authUserMiddleware, authenticateUser);

module.exports = router;
