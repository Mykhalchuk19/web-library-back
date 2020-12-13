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

/**
 * @api {post} /authors/create Create author
 * @apiVersion 0.0.1
 * @apiName Create author
 * @apiGroup Authors
 *
 * @apiParam {String} firstname First name of author
 * @apiParam {String} lastname Last name of author
 *
 * @apiSuccess {Object} author Author model.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "author": {
 *                "id": 10,
 *                "firstname": "test",
 *                "lastname": "test"
 *            }
 *        }
 *    }
 *
 *
 * @apiError MissingFirstName 400 Missing first name
 * @apiError NotAllowed 403 Not allowed
 * @apiError NotAuthorized 401 Not authorized
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError Error 400 Other error
 * @apiErrorExample {json} MissingFirstName:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "You should input first name of author"
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
router.post(
  '/create', jsonParser,
  auth,
  isPermission(modules.AUTHORS, actions.CREATE),
  createAuthorMiddleware,
  createAuthor,
);

/**
 * @api {get} /authors Get list of authors
 * @apiVersion 0.0.1
 * @apiName Get authors
 * @apiGroup Authors
 *
 * @apiParam {Number} page Page
 * @apiParam {Number} limit Limit of authors
 * @apiParam {String} q String for search
 *
 * @apiSuccess {Number} limit Limit of authors
 * @apiSuccess {Number} page Page
 * @apiSuccess {Array[Object]} authors List of authors
 * @apiSuccess {Number} count Count of authors
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "limit": 10,
 *            "page": 0,
 *            "authors":[
 *              {
 *                "id": 9,
 *                "firstname": "Lesia",
 *                "lastname": "Ukrainka",
 *                "books": [
 *                  {
 *                    "id": 41,
 *                    "title": "Book named after Lesia Ukrainka"
 *                  },
 *                  {
 *                    "id": 42,
 *                    "title": "some book"
 *                  }
 *                ]
 *              },
 *              {
 *                "id": 10,
 *                "firstname": "test",
 *                "lastname": "test",
 *                "books": []
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
router.get('/', jsonParser, auth, isPermission(modules.AUTHORS, actions.READ), getAuthorsList);

/**
 * @api {put} /authors/:id Update author
 * @apiVersion 0.0.1
 * @apiName Update author
 * @apiGroup Authors
 *
 * @apiParam {Number} id Id of author
 * @apiParam {String} firstname First name of author
 * @apiParam {String} lastname Last name of author
 *
 * @apiSuccess {Object} author Author model.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "author": {
 *                "id": 10,
 *                "firstname": "test",
 *                "lastname": "test"
 *            }
 *        }
 *    }
 *
 *
 * @apiError MissingFirstName 400 Missing first name
 * @apiError AuthorIsNotExists 400 Author is not exists
 * @apiError NotAllowed 403 Not allowed
 * @apiError NotAuthorized 401 Not authorized
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError Error 400 Other error
 * @apiErrorExample {json} MissingFirstName:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "You should input first name of author"
 *        }
 *     }
 *
 *  @apiErrorExample {json} AuthorIsNotExists:
 *    HTTP/1.1 400
 *    {
 *        "status": 400,
 *        "result" {
 *            "error": "This author is not exists"
 *        }
 *    }
 *
 *  @apiErrorExample {json} NotAllowed:
 *     HTTP/1.1 403
 *     {
 *        "status": 403,
 *        "result": {
 *            "error": "Not allowed"
 *        }
 *     }
 *
 *  @apiErrorExample {json} NotAuthorized:
 *     HTTP/1.1 401
 *     {
 *        "status": 401,
 *        "result": {
 *            "error": "You are not authorized"
 *        }
 *     }
 *
 *  @apiErrorExample {json} UserIsNotExists:
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
router.put(
  '/:id',
  jsonParser,
  auth,
  isPermission(modules.AUTHORS, actions.UPDATE),
  updateAuthorMiddleware,
  updateAuthor,
);

/**
 * @api {delete} /authors/:id Delete author
 * @apiVersion 0.0.1
 * @apiName Delete author
 * @apiGroup Authors
 *
 * @apiParam {Number} id Id of author
 *
 * @apiSuccess {number} author Author id.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "author": 10
 *        }
 *    }
 *
 *
 * @apiError NotAllowed 403 Not allowed
 * @apiError NotAuthorized 401 Not authorized
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError Error 400 Other error
 *
 *  @apiErrorExample {json} NotAllowed:
 *     HTTP/1.1 403
 *     {
 *        "status": 403,
 *        "result": {
 *            "error": "Not allowed"
 *        }
 *     }
 *
 *  @apiErrorExample {json} NotAuthorized:
 *     HTTP/1.1 401
 *     {
 *        "status": 401,
 *        "result": {
 *            "error": "You are not authorized"
 *        }
 *     }
 *
 *  @apiErrorExample {json} UserIsNotExists:
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
router.delete('/:id', jsonParser, auth, isPermission(modules.AUTHORS, actions.DELETE), deleteAuthor);

/**
 * @api {get} /authors/autocomplete Get authors for autocomplete
 * @apiVersion 0.0.1
 * @apiName Get authors for autocomplete
 * @apiGroup Authors
 *
 * @apiParam {Number} id Id of author
 * @apiParam {String} q String for search
 *
 * @apiSuccess {Array[Object]} autocomplete List of authors for autocomplete.
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
router.get('/autocomplete', jsonParser, auth, isPermission(modules.AUTHORS, actions.CREATE), getAuthorsAutocomplete);

module.exports = router;
