const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { AuthController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

const {
  createUser,
  authenticateUser,
  activateAccount,
  forgotPassword,
  resetPassword,
} = AuthController;
const {
  createUserMiddleware,
  authUserMiddleware,
  activateAccountMiddleware,
  forgotPasswordMiddleware,
  resetPasswordMiddleware,
} = AuthMiddleware;

router.post('/signup', jsonParser, createUserMiddleware, createUser);
router.post('/signin', jsonParser, authUserMiddleware, authenticateUser);
router.post('/activate-account', jsonParser, activateAccountMiddleware, activateAccount);
router.post('/forgot-password', jsonParser, forgotPasswordMiddleware, forgotPassword);
router.post('/reset-password', jsonParser, resetPasswordMiddleware, resetPassword);

module.exports = router;
