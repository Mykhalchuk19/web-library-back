const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { UserController } = require('../controllers');
const { UserMiddleware, AuthMiddleware, PermissionMiddleware, FileMiddleware } = require('../middlewares');
const { modules, actions } = require('../constants');

const {
  updateUser,
  getUsersList,
  deleteUser,
  getUser,
  currentUser,
  updateProfile,
  uploadAvatar,
} = UserController;
const { updateUserMiddleware, updateProfileMiddleware, deleteUserMiddleware, uploadAvatarMiddleware } = UserMiddleware;
const { auth } = AuthMiddleware;
const { isPermission } = PermissionMiddleware;
const { isFile } = FileMiddleware;

router.put('/profile', jsonParser, auth, updateProfileMiddleware, updateProfile);
router.post('/profile/avatar', jsonParser, auth, isFile, uploadAvatarMiddleware, uploadAvatar);
router.put('/:id', jsonParser, auth, isPermission(modules.USERS, actions.UPDATE), updateUserMiddleware, updateUser);
router.get('/', jsonParser, auth, isPermission(modules.USERS, actions.READ), getUsersList);
router.get('/current-user', jsonParser, auth, currentUser);
router.get('/:id', jsonParser, auth, isPermission(modules.USERS, actions.READ), getUser);
router.delete('/:id', jsonParser, auth, isPermission(modules.USERS, actions.DELETE), deleteUserMiddleware, deleteUser);

module.exports = router;
