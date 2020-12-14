const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { BookController } = require('../controllers');
const { AuthMiddleware, PermissionMiddleware, FileMiddleware, BookMiddleware } = require('../middlewares');
const { modules, actions } = require('../constants');

const { addBook, getBooksList, updateBook, deleteBook, downloadBook, getBookById } = BookController;
const { auth } = AuthMiddleware;
const { isPermission } = PermissionMiddleware;
const { isFile } = FileMiddleware;
const { isBook, checkBookFields, checkFileId } = BookMiddleware;

/**
 * @api {post} /books/create Create book
 * @apiVersion 0.0.1
 * @apiName Create book
 * @apiGroup Books
 *
 * @apiParam {String} title Title of book
 * @apiParam {String} short_description Short description of book
 * @apiParam {String} city City of book
 * @apiParam {String} year Year of book
 * @apiParam {String} publishing_house Publishing house of book
 * @apiParam {String} edition Edition of book
 * @apiParam {String} series Series of book
 * @apiParam {number} category_id Id category of book
 * @apiParam {Array[number]} authors Array of author`s ids for book
 * @apiParam {[File]} file File of book
 *
 * @apiSuccess {Object} book Book model.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "book": {
 *                "id": 10,
 *                "title": "Title of book"
 *                "short_description": "test",
 *                "city": "Lutsk",
 *                "year": "2000",
 *                "publishing_house": "Some publishing house",
 *                "edition": "edition",
 *                "series": "series",
 *                "created_by": 1,
 *                "category_id": 3,
 *                "file_id": 15,
 *                "category": {
 *                    "title": "Title of category"
 *                },
 *                "file": {
 *                    "filename": "filename.png"
 *                },
 *                "authors": [
 *                    {
 *                        "id": 1,
 *                        "firstname": "test",
 *                        "lastname": "test"
 *                    }
 *                ]
 *            }
 *        }
 *    }
 *
 *
 * @apiError MissingTitle 400 Missing title
 * @apiError FileWasNotUploaded 400 File was not uploaded
 * @apiError NotAllowed 403 Not allowed
 * @apiError NotAuthorized 401 Not authorized
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError Error 400 Other error
 * @apiErrorExample {json} MissingTitle:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "Title is required"
 *        }
 *     }
 * @apiErrorExample {json} FileWasNotUploaded:
 *     HTTP/1.1 400
 *     {
 *         "status": 400,
 *         "result": {
 *             "error": "File was not uploaded"
 *         }
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
  '/create',
  jsonParser,
  auth,
  isPermission(modules.BOOKS, actions.CREATE),
  isFile,
  checkBookFields,
  addBook,
);

/**
 * @api {get} /books Get list of books
 * @apiVersion 0.0.1
 * @apiName Get books
 * @apiGroup Books
 *
 * @apiParam {Number} page Page
 * @apiParam {Number} limit Limit of books
 * @apiParam {String} q String for search
 *
 * @apiSuccess {Number} limit Limit of books
 * @apiSuccess {Number} page Page
 * @apiSuccess {Array[Object]} books List of books
 * @apiSuccess {Number} count Count of books
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "limit": 10,
 *            "page": 0,
 *            "books":[
 *              {
 *                "id": 1,
 *                "title": "123123123123123",
 *                "short_description": null,
 *                "city": null,
 *                "year": null,
 *                "publishing_house": null,
 *                "edition": null,
 *                "series": null,
 *                "created_by": 103,
 *                "category_id": null,
 *                "file_id": 1,
 *                "category": null,
 *                "file": {
 *                   "filename": "laSLxOBhAfqlxY3image.png"
 *                },
 *                "authors": []
 *              },
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
router.get('/', jsonParser, auth, isPermission(modules.BOOKS, actions.READ), getBooksList);

/**
 * @api {get} /books/get/:id Get book
 * @apiVersion 0.0.1
 * @apiName Get book
 * @apiGroup Books
 *
 * @apiParam {Number} id Id of book
 *
 * @apiSuccess {Object} book Book model.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "book": {
 *                "id": 10,
 *                "title": "Title of book"
 *                "short_description": "test",
 *                "city": "Lutsk",
 *                "year": "2000",
 *                "publishing_house": "Some publishing house",
 *                "edition": "edition",
 *                "series": "series",
 *                "created_by": 1,
 *                "category_id": 3,
 *                "file_id": 15,
 *                "category": {
 *                    "title": "Title of category"
 *                },
 *                "file": {
 *                    "filename": "filename.png"
 *                },
 *                "authors": [
 *                    {
 *                        "id": 1,
 *                        "firstname": "test",
 *                        "lastname": "test"
 *                    }
 *                ]
 *            }
 *        }
 *    }
 *
 * @apiError NotAllowed 403 Not allowed
 * @apiError NotAuthorized 401 Not authorized
 * @apiError BookIsNotExists 400 Book is not exists
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError Error 400 Other error
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
 * @apiErrorExample {json} BookIsNotExists:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "Such book is not exists"
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
router.get(
  '/get/:id',
  jsonParser,
  auth,
  isBook,
  isPermission(modules.BOOKS, actions.READ),
  getBookById,
);

/**
 * @api {put} /books/:id Update book
 * @apiVersion 0.0.1
 * @apiName Update book
 * @apiGroup Books
 *
 * @apiParam {Number} id id of book
 * @apiParam {String} title Title of book
 * @apiParam {String} short_description Short description of book
 * @apiParam {String} city City of book
 * @apiParam {String} year Year of book
 * @apiParam {String} publishing_house Publishing house of book
 * @apiParam {String} edition Edition of book
 * @apiParam {String} series Series of book
 * @apiParam {number} category_id Id category of book
 * @apiParam {Array[number]} authors Array of author`s ids for book
 * @apiParam {[File]} file File of book
 * @apiParam {Number} file_id Id of previus file for book
 *
 * @apiSuccess {Object} book Book model.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "book": {
 *                "id": 10,
 *                "title": "Title of book"
 *                "short_description": "test",
 *                "city": "Lutsk",
 *                "year": "2000",
 *                "publishing_house": "Some publishing house",
 *                "edition": "edition",
 *                "series": "series",
 *                "created_by": 1,
 *                "category_id": 3,
 *                "file_id": 15,
 *                "category": {
 *                    "title": "Title of category"
 *                },
 *                "file": {
 *                    "filename": "filename.png"
 *                },
 *                "authors": [
 *                    {
 *                        "id": 1,
 *                        "firstname": "test",
 *                        "lastname": "test"
 *                    }
 *                ]
 *            }
 *        }
 *    }
 *
 *
 * @apiError MissingTitle 400 Missing title
 * @apiError BookIsNotExists 400 Such book is not exists
 * @apiError NotAllowed 403 Not allowed
 * @apiError NotAuthorized 401 Not authorized
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError Error 400 Other error
 * @apiErrorExample {json} MissingTitle:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "Title is required"
 *        }
 *     }
 * @apiErrorExample {json} BookIsNotExists:
 *     HTTP/1.1 400
 *     {
 *         "status": 400,
 *         "result": {
 *             "error": "Such book is not exists"
 *         }
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

/**
 * @api {delete} /books/:id Delete book
 * @apiVersion 0.0.1
 * @apiName Delete book
 * @apiGroup Books
 *
 * @apiParam {Number} id Id of book
 *
 * @apiSuccess {number} book Book id.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "book": 3
 *        }
 *    }
 *
 *
 * @apiError NotAllowed 403 Not allowed
 * @apiError NotAuthorized 401 Not authorized
 * @apiError BookIsNotExists 400 Book is not exists
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
 *  @apiErrorExample {json} BookIsNotExists:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "Such book is not exists"
 *        }
 *     }
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
router.delete(
  '/:id',
  jsonParser,
  auth,
  isPermission(modules.BOOKS, actions.DELETE),
  isBook,
  deleteBook,
);

/**
 * @api {get} /books/download/:filename Download book
 * @apiVersion 0.0.1
 * @apiName Download book
 * @apiGroup Books
 *
 * @apiParam {String} filename Filename of book
 *
 * @apiSuccess {Object} book Book for download.
 *
 * @apiError BookIsNotExists 400 Book is not exists
 * @apiError Error 400 Other error
 *
 *  @apiErrorExample {json} BookIsNotExists:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "Such book is not exists"
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
router.get(
  '/download/:filename',
  jsonParser,
  downloadBook,
);

module.exports = router;
