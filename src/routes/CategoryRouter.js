const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { CategoryController } = require('../controllers');
const { CategoryMiddleware, AuthMiddleware, PermissionMiddleware } = require('../middlewares');
const { modules, actions } = require('../constants');

const { addCategory, getCategoriesList, updateCategory, deleteCategory } = CategoryController;
const { createCategoryMiddleware, updateCategoryMiddleware } = CategoryMiddleware;
const { auth } = AuthMiddleware;
const { isPermission } = PermissionMiddleware;

router.post('/create', jsonParser, auth, isPermission(modules.CATEGORIES, actions.CREATE), createCategoryMiddleware, addCategory);
router.get('/', jsonParser, auth, isPermission(modules.CATEGORIES, actions.READ), getCategoriesList);
router.put('/:id', jsonParser, auth, isPermission(modules.CATEGORIES, actions.UPDATE), updateCategoryMiddleware, updateCategory);
router.delete('/:id', jsonParser, auth, isPermission(modules.CATEGORIES, actions.DELETE), deleteCategory);

module.exports = router;
