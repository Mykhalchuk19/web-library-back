const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { BookController } = require('../controllers');
const { AuthMiddleware, PermissionMiddleware } = require('../middlewares');
const { modules, actions } = require('../constants');

const { addBook, getBooksList, deleteBook } = BookController;
const { auth } = AuthMiddleware;
const { isPermission } = PermissionMiddleware;

router.post('/create', jsonParser, auth, isPermission(modules.BOOKS, actions.CREATE), addBook);
router.get('/', jsonParser, auth, isPermission(modules.BOOKS, actions.READ), getBooksList);
router.delete('/:id', jsonParser, auth, isPermission(modules.BOOKS, actions.DELETE), deleteBook);

module.exports = router;
