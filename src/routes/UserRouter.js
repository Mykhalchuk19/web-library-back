const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { UserController } = require('../controllers');
const { UserMiddleware } = require('../middlewares');

const { updateUser, getUsersList, deleteUser } = UserController;
const { updateUserMiddleware } = UserMiddleware;
router.put('/:id', jsonParser, updateUserMiddleware, updateUser);
router.get('/', jsonParser, getUsersList);
router.delete('/:id', jsonParser, deleteUser);

module.exports = router;
