const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { AuthController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

const { createUser, authenticateUser, activateAccount } = AuthController;
const { createUserMiddleware, authUserMiddleware, activateAccountMiddleware } = AuthMiddleware;

router.post('/signup', jsonParser, createUserMiddleware, createUser);
router.post('/signin', jsonParser, authUserMiddleware, authenticateUser);
router.post('/activate-account', jsonParser, activateAccountMiddleware, activateAccount);

module.exports = router;
