const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { UserController } = require('../controllers');
const { UserMiddleware, AuthMiddleware } = require('../middlewares');

const { updateUser, getUsersList, deleteUser, getUser, currentUser } = UserController;
const { updateUserMiddleware } = UserMiddleware;
const { auth } = AuthMiddleware;
router.put('/:id', jsonParser, auth, updateUserMiddleware, updateUser);
router.get('/', jsonParser, auth, getUsersList);
router.get('/current-user', auth, currentUser);
router.get('/:id', jsonParser, auth, getUser);
router.delete('/:id', jsonParser, auth, deleteUser);

module.exports = router;
