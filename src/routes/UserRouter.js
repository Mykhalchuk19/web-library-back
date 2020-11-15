const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { UserController } = require('../controllers');
const { UserMiddleware, AuthMiddleware, PermissionMiddleware } = require('../middlewares');
const { modules, actions } = require('../constants');

const { updateUser, getUsersList, deleteUser, getUser, currentUser } = UserController;
const { updateUserMiddleware, updateProfileMiddleware, deleteUserMiddleware } = UserMiddleware;
const { auth } = AuthMiddleware;
const { isPermission } = PermissionMiddleware;

router.put('/:id', jsonParser, auth, isPermission(modules.USERS, actions.UPDATE), updateUserMiddleware, updateUser);
router.put('/profile', jsonParser, auth, updateProfileMiddleware, updateUser);
router.get('/', jsonParser, auth, isPermission(modules.USERS, actions.READ), getUsersList);
router.get('/current-user', jsonParser, auth, currentUser);
router.get('/:id', jsonParser, auth, isPermission(modules.USERS, actions.READ), getUser);
router.delete('/:id', jsonParser, auth, isPermission(modules.USERS, actions.DELETE), deleteUserMiddleware, deleteUser);

module.exports = router;
