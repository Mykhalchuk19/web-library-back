const express = require('express');

const router = express.Router();
const jsonParser = express.json();

const { AuthorController } = require('../controllers');
const { AuthMiddleware, PermissionMiddleware, AuthorMiddleware } = require('../middlewares');
const { modules, actions } = require('../constants');

const {
  createAuthor,
  getAuthorsList,
  updateAuthor,
  deleteAuthor,
  getAuthorsAutocomplete,
} = AuthorController;
const { auth } = AuthMiddleware;
const { isPermission } = PermissionMiddleware;
const { createAuthorMiddleware, updateAuthorMiddleware } = AuthorMiddleware;

router.post(
  '/create', jsonParser,
  auth,
  isPermission(modules.AUTHORS, actions.CREATE),
  createAuthorMiddleware,
  createAuthor,
);

router.get('/', jsonParser, auth, isPermission(modules.AUTHORS, actions.READ), getAuthorsList);

router.put(
  '/:id',
  jsonParser,
  auth,
  isPermission(modules.AUTHORS, actions.UPDATE),
  updateAuthorMiddleware,
  updateAuthor,
);

router.delete('/:id', jsonParser, auth, isPermission(modules.AUTHORS, actions.DELETE), deleteAuthor);

router.get('/autocomplete', jsonParser, auth, isPermission(modules.AUTHORS, actions.CREATE), getAuthorsAutocomplete);

module.exports = router;
