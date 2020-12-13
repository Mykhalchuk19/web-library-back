const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { CategoryController } = require('../controllers');
const { CategoryMiddleware, AuthMiddleware, PermissionMiddleware } = require('../middlewares');
const { modules, actions } = require('../constants');

const {
  addCategory,
  getCategoriesList,
  updateCategory,
  deleteCategory,
  getCategoriesAutocomplete,
} = CategoryController;
const { createCategoryMiddleware, updateCategoryMiddleware } = CategoryMiddleware;
const { auth } = AuthMiddleware;
const { isPermission } = PermissionMiddleware;

/**
 * @api {post} /categories/create Create category
 * @apiVersion 0.0.1
 * @apiName Create category
 * @apiGroup Categories
 *
 * @apiParam {String} title Title of category
 * @apiParam {String} short_description Short description of category
 * @apiParam {String} description Description of category
 * @apiParam {Number} parent_id Parent category`s id (optional)
 *
 * @apiSuccess {Object} category Category model.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "category": {
 *                "id": 10,
 *                "title": "test",
 *                "short_description": "test",
 *                "description": "test",
 *                "parent_id": "2",
 *                "created_by": 2,
 *                "creator": {
 *                    "firstname": "1",
 *                    "lastname": "2"
 *                }
 *            }
 *        }
 *    }
 *
 *
 * @apiError MissingTitle 400 Missing title
 * @apiError TitleShouldBeUnique 400 Title should be unique
 * @apiError NotAllowed 403 Not allowed
 * @apiError NotAuthorized 401 Not authorized
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError Error 400 Other error
 * @apiErrorExample {json} MissingTitle:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "You should input title of category"
 *        }
 *     }
 * @apiErrorExample {json} TitleShouldBeUnique:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "Title should be unique"
 *        }
 *     }
 * @apiErrorExample {json} NotAllowed:
 *     HTTP/1.1 403
 *     {
 *        "status": 403,
 *        "result": {
 *            "error": "Not allowed"
 *        }
 *     }
 *
 * @apiErrorExample {json} NotAuthorized:
 *     HTTP/1.1 401
 *     {
 *        "status": 401,
 *        "result": {
 *            "error": "You are not authorized"
 *        }
 *     }
 *
 * @apiErrorExample {json} UserIsNotExists:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "Such user is not exists"
 *        }
 *     }
 *
 *
 * @apiErrorExample {json} Error:
 *     HTTP/1.1 400
 *     {
 *       "status": 400,
 *       "result": {
 *            "error": "Something went wrong"
 *       }
 *     }
 */
router.post('/create', jsonParser, auth, isPermission(modules.CATEGORIES, actions.CREATE), createCategoryMiddleware, addCategory);

/**
 * @api {get} /categories Get list of categories
 * @apiVersion 0.0.1
 * @apiName Get categories
 * @apiGroup Categories
 *
 * @apiParam {Number} page Page
 * @apiParam {Number} limit Limit of categories
 * @apiParam {String} q String for search
 *
 * @apiSuccess {Number} limit Limit of categories
 * @apiSuccess {Number} page Page
 * @apiSuccess {Array[Object]} categories List of categories
 * @apiSuccess {Number} count Count of categories
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "limit": 10,
 *            "page": 0,
 *            "categories":[
 *              {
 *                "id": 10,
 *                "title": "test",
 *                "short_description": "test",
 *                "description": "test",
 *                "parent_id": "2",
 *                "creator": {
 *                    "firstname": "1",
 *                    "lastname": "2"
 *                }
 *              },
 *              {
 *                "id": 11,
 *                "title": "test12",
 *                "short_description": null,
 *                "description": null,
 *                "parent_id": null,
 *                "creator": null
 *              }
 *           ]
 *        }
 *     }
 *
 * @apiError NotAllowed 403 Not allowed
 * @apiError NotAuthorized 401 Not authorized
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError Error 400 Other error
 *
 * @apiErrorExample {json} NotAllowed:
 *     HTTP/1.1 403
 *     {
 *        "status": 403,
 *        "result": {
 *            "error": "Not allowed"
 *        }
 *     }
 *
 * @apiErrorExample {json} NotAuthorized:
 *     HTTP/1.1 401
 *     {
 *        "status": 401,
 *        "result": {
 *            "error": "You are not authorized"
 *        }
 *     }
 *
 * @apiErrorExample {json} UserIsNotExists:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "Such user is not exists"
 *        }
 *     }
 *
 * @apiErrorExample {json} Error:
 *     HTTP/1.1 400
 *     {
 *       "status": 400,
 *       "result": {
 *            "error": "Something went wrong"
 *       }
 *     }
 */
router.get('/', jsonParser, auth, isPermission(modules.CATEGORIES, actions.READ), getCategoriesList);

/**
 * @api {put} /categories/:id Update category
 * @apiVersion 0.0.1
 * @apiName Update category
 * @apiGroup Categories
 *
 * @apiParam {Number} id Id of category
 * @apiParam {String} title Title of category
 * @apiParam {String} short_description Short description of category
 * @apiParam {String} description Description of category
 * @apiParam {Number} parent_id Parent category`s id (optional)
 *
 * @apiSuccess {Object} category Category model.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "category": {
 *                "id": 10,
 *                "title": "test",
 *                "short_description": "test",
 *                "description": "test",
 *                "parent_id": "2",
 *                "created_by": 2,
 *                "creator": {
 *                    "firstname": "1",
 *                    "lastname": "2"
 *                }
 *            }
 *        }
 *    }
 *
 *
 * @apiError MissingTitle 400 Missing title
 * @apiError TitleShouldBeUnique 400 Title should be unique
 * @apiError CategoryIsNotExists 400 Category is not exists
 * @apiError NotAllowed 403 Not allowed
 * @apiError NotAuthorized 401 Not authorized
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError Error 400 Other error
 * @apiErrorExample {json} MissingTitle:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "You should input title of category"
 *        }
 *     }
 * @apiErrorExample {json} TitleShouldBeUnique:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "Title should be unique"
 *        }
 *     }
 * @apiErrorExample {json} CategoryIsNotExists:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "This category is not exists"
 *        }
 *     }
 * @apiErrorExample {json} NotAllowed:
 *     HTTP/1.1 403
 *     {
 *        "status": 403,
 *        "result": {
 *            "error": "Not allowed"
 *        }
 *     }
 *
 * @apiErrorExample {json} NotAuthorized:
 *     HTTP/1.1 401
 *     {
 *        "status": 401,
 *        "result": {
 *            "error": "You are not authorized"
 *        }
 *     }
 *
 * @apiErrorExample {json} UserIsNotExists:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "Such user is not exists"
 *        }
 *     }
 *
 *
 * @apiErrorExample {json} Error:
 *     HTTP/1.1 400
 *     {
 *       "status": 400,
 *       "result": {
 *            "error": "Something went wrong"
 *       }
 *     }
 */
router.put('/:id', jsonParser, auth, isPermission(modules.CATEGORIES, actions.UPDATE), updateCategoryMiddleware, updateCategory);

/**
 * @api {delete} /categories/:id Delete category
 * @apiVersion 0.0.1
 * @apiName Delete category
 * @apiGroup Categories
 *
 * @apiParam {Number} id Id of category
 *
 * @apiSuccess {number} author Author id.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "category": 10
 *        }
 *    }
 *
 *
 * @apiError NotAllowed 403 Not allowed
 * @apiError NotAuthorized 401 Not authorized
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError Error 400 Other error
 *
 * @apiErrorExample {json} NotAllowed:
 *     HTTP/1.1 403
 *     {
 *        "status": 403,
 *        "result": {
 *            "error": "Not allowed"
 *        }
 *     }
 *
 * @apiErrorExample {json} NotAuthorized:
 *     HTTP/1.1 401
 *     {
 *        "status": 401,
 *        "result": {
 *            "error": "You are not authorized"
 *        }
 *     }
 *
 * @apiErrorExample {json} UserIsNotExists:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "Such user is not exists"
 *        }
 *     }
 *
 * @apiErrorExample {json} Error:
 *     HTTP/1.1 400
 *     {
 *       "status": 400,
 *       "result": {
 *            "error": "Something went wrong"
 *       }
 *     }
 */
router.delete('/:id', jsonParser, auth, isPermission(modules.CATEGORIES, actions.DELETE), deleteCategory);

/**
 * @api {get} /categories/autocomplete Get categories for autocomplete
 * @apiVersion 0.0.1
 * @apiName Get categories for autocomplete
 * @apiGroup Categories
 *
 * @apiParam {Number} id Id of category
 * @apiParam {String} q String for search
 *
 * @apiSuccess {Array[Object]} autocomplete List of categories for autocomplete.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "autocomplete": [
 *                {
 *                    "label": "1",
 *                    "value": "1"
 *                },
 *                {
 *                    "label": "2",
 *                    "value": "2"
 *                }
 *            ]
 *        }
 *    }
 *
 *
 * @apiError NotAllowed 403 Not allowed
 * @apiError NotAuthorized 401 Not authorized
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError Error 400 Other error
 *
 * @apiErrorExample {json} NotAllowed:
 *     HTTP/1.1 403
 *     {
 *        "status": 403,
 *        "result": {
 *            "error": "Not allowed"
 *        }
 *     }
 *
 * @apiErrorExample {json} NotAuthorized:
 *     HTTP/1.1 401
 *     {
 *        "status": 401,
 *        "result": {
 *            "error": "You are not authorized"
 *        }
 *     }
 *
 * @apiErrorExample {json} UserIsNotExists:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "Such user is not exists"
 *        }
 *     }
 *
 * @apiErrorExample {json} Error:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "Something went wrong"
 *        }
 *     }
 */
router.get('/autocomplete', jsonParser, auth, isPermission(modules.CATEGORIES, actions.CREATE), getCategoriesAutocomplete);

module.exports = router;
