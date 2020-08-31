const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { UserController } = require('../controllers');

console.log(UserController);

const { createUser } = UserController;

router.post('/signin', jsonParser, createUser);

module.exports = router;
