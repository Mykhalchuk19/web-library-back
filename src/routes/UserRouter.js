const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { UserController } = require('../controllers');

const { createUser, authenticateUser } = UserController;

router.post('/signup', jsonParser, createUser);
router.post('/signin', jsonParser, authenticateUser);

module.exports = router;
