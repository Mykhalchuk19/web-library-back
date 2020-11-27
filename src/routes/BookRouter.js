const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { BookController } = require('../controllers');
const { AuthMiddleware, PermissionMiddleware, FileMiddleware, BookMiddleware } = require('../middlewares');
const { modules, actions } = require('../constants');

const { addBook, getBooksList, updateBook, deleteBook, downloadBook } = BookController;
const { auth } = AuthMiddleware;
const { isPermission } = PermissionMiddleware;
const { isFile } = FileMiddleware;
const { isBook, checkBookFields, checkFileId } = BookMiddleware;

router.post(
  '/create',
  jsonParser,
  auth,
  isPermission(modules.BOOKS, actions.CREATE),
  isFile,
  checkBookFields,
  addBook,
);

router.get('/', jsonParser, auth, isPermission(modules.BOOKS, actions.READ), getBooksList);

router.put(
  '/:id',
  jsonParser,
  auth,
  isPermission(modules.BOOKS, actions.UPDATE),
  isBook,
  checkBookFields,
  checkFileId,
  updateBook,
);

router.delete(
  '/:id',
  jsonParser,
  auth,
  isPermission(modules.BOOKS, actions.DELETE),
  isBook,
  deleteBook,
);

router.get(
  '/download/:filename',
  jsonParser,
  downloadBook,
);

module.exports = router;
