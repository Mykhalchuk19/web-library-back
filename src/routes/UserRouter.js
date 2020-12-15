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

/**
 * @api {put} /users/profile Update profile
 * @apiVersion 0.0.1
 * @apiName Update profile
 * @apiGroup Users
 *
 * @apiParam {Number} id Id of user
 * @apiParam {String} username Username of user
 * @apiParam {String} firstname First name of user
 * @apiParam {String} lastname Last name of user
 * @apiParam {String} email Email of user
 * @apiParam {Number} type Type of user
 *
 * @apiSuccess {Object} userData User model with permissions.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "userData": {
 *                "id": 10,
 *                "firstname": "test",
 *                "lastname": "test",
 *                "email": "mail@gmail.com",
 *                "type": 4,
 *                "status": 2,
 *                "avatar": null,
 *                "file": {
 *                    "filename": "somefilename.png"
 *                },
 *                "permissions": [
 *                    {
 *                        "module": "users",
 *                        "read": 1,
 *                        "create": 1,
 *                        "update": 1,
 *                        "delete": 1
 *                    },
 *                    {
 *                        "module": "categories",
 *                        "read": 1,
 *                        "create": 1,
 *                        "update": 1,
 *                        "delete": 1
 *                    },
 *                    {
 *                        "module": "books",
 *                        "read": 1,
 *                        "create": 1,
 *                        "update": 1,
 *                        "delete": 1
 *                    },
 *                    {
 *                        "module": "authors",
 *                        "read": 1,
 *                        "create": 1,
 *                        "update": 1,
 *                        "delete": 1
 *                    }
 *                ]
 *            },
 *        }
 *    }
 *
 * @apiError NotAuthorized 401 Not authorized
 * @apiError MissingFields 400 Missing fields
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError Error 400 Other error
 *
 * @apiErrorExample {json} NotAuthorized:
 *     HTTP/1.1 401
 *     {
 *        "status": 401,
 *        "result": {
 *            "error": "You are not authorized"
 *        }
 *     }
 * @apiErrorExample {json} MissingFields:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "You should input all fields"
 *        }
 *     }
 * @apiErrorExample {json} UserIsNotExists:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "User is not exists"
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
router.put('/profile', jsonParser, auth, updateProfileMiddleware, updateProfile);

/**
 * @api {post} /users/profile/avatar Upload avatar
 * @apiVersion 0.0.1
 * @apiName Upload avatar
 * @apiGroup Users
 *
 * @apiParam {Number} avatar Current avatar of user
 * @apiparam {[File]} file File, which is uploaded
 *
 * @apiSuccess {Object} userData User model with permissions.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "userData": {
 *                "id": 10,
 *                "firstname": "test",
 *                "lastname": "test",
 *                "email": "mail@gmail.com",
 *                "type": 4,
 *                "status": 2,
 *                "avatar": null,
 *                "file": {
 *                    "filename": "somefilename.png"
 *                },
 *                "permissions": [
 *                    {
 *                        "module": "users",
 *                        "read": 1,
 *                        "create": 1,
 *                        "update": 1,
 *                        "delete": 1
 *                    },
 *                    {
 *                        "module": "categories",
 *                        "read": 1,
 *                        "create": 1,
 *                        "update": 1,
 *                        "delete": 1
 *                    },
 *                    {
 *                        "module": "books",
 *                        "read": 1,
 *                        "create": 1,
 *                        "update": 1,
 *                        "delete": 1
 *                    },
 *                    {
 *                        "module": "authors",
 *                        "read": 1,
 *                        "create": 1,
 *                        "update": 1,
 *                        "delete": 1
 *                    }
 *                ]
 *            },
 *        }
 *    }
 *
 * @apiError NotAuthorized 401 Not authorized
 * @apiError FileWasNotUploaded 400 File was not uploaded
 * @apiError IncorrectFileFormat 400 Incorrect file format for uploading
 * @apiError Error 400 Other error
 *
 * @apiErrorExample {json} NotAuthorized:
 *     HTTP/1.1 401
 *     {
 *        "status": 401,
 *        "result": {
 *            "error": "You are not authorized"
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
 * @apiErrorExample {json} IncorrectFileFormat:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "Allow only svg, png, jpg and jpeg formats"
 *        }
 *     }
 * @apiErrorExample {json} Error:
 *     HTTP/1.1 400
 *     {
 *       "status": 400,
 *       "result": {
 *            "error": "Something went wrong"
 *       }
 *     }
 */
router.post('/profile/avatar', jsonParser, auth, isFile, uploadAvatarMiddleware, uploadAvatar);

/**
 * @api {put} /users/:id Update user
 * @apiVersion 0.0.1
 * @apiName Update user
 * @apiGroup Users
 *
 * @apiParam {Number} id Id of user
 * @apiParam {String} username Username of user
 * @apiParam {String} firstname First name of user
 * @apiParam {String} lastname Last name of user
 * @apiParam {String} email Email of user
 * @apiParam {String} type Type of user
 *
 * @apiSuccess {Object} userData User model.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "userData": {
 *                "id": 10,
 *                "firstname": "test",
 *                "lastname": "test",
 *                "email": "mail@gmail.com",
 *                "type": 4,
 *                "status": 2,
 *                "avatar": null,
 *                "file": {
 *                    "filename": "somefilename.png"
 *                },
 *            },
 *        }
 *    }
 *
 * @apiError NotAuthorized 401 Not authorized
 * @apiError NotAllowed 403 Not allowed
 * @apiError MissingFields 400 Missing fields
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError TryEditSuperAdmin 400 Super admin cannot be edited
 * @apiError Error 400 Other error
 *
 * @apiErrorExample {json} NotAuthorized:
 *     HTTP/1.1 401
 *     {
 *        "status": 401,
 *        "result": {
 *            "error": "You are not authorized"
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
 * @apiErrorExample {json} MissingFields:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "You should input all fields"
 *        }
 *     }
 * @apiErrorExample {json} UserIsNotExists:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "User is not exists"
 *        }
 *     }
 *
 * @apiErrorExample {json} TryEditSuperAdmin:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "You cannot edit super admin"
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
router.put('/:id', jsonParser, auth, isPermission(modules.USERS, actions.UPDATE), updateUserMiddleware, updateUser);

/**
 * @api {get} /users Get list of users
 * @apiVersion 0.0.1
 * @apiName Get users
 * @apiGroup Users
 *
 * @apiParam {Number} page Page
 * @apiParam {Number} limit Limit of users
 * @apiParam {String} q String for search
 *
 * @apiSuccess {Number} limit Limit of users
 * @apiSuccess {Number} page Page
 * @apiSuccess {Array[Object]} books List of users
 * @apiSuccess {Number} count Count of users
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "limit": 10,
 *            "page": 0,
 *            "users":[
 *              {
 *                "id": 1,
 *                "firstname": "test",
 *                "lastname": "test",
 *                "email": "mail@gmail.com",
 *                "type": 4,
 *                "status": 2,
 *                "file": {
 *                    "filename": "somefilename.png"
 *                },
 *              },
 *              {
 *                "id": 2,
 *                "firstname": "test2",
 *                "lastname": "test2",
 *                "email": "mail@gmail2.com",
 *                "type": 4,
 *                "status": 2,
 *                "file": null,
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
router.get('/', jsonParser, auth, isPermission(modules.USERS, actions.READ), getUsersList);

/**
 * @api {get} /users/current-user Get current user
 * @apiVersion 0.0.1
 * @apiName Get current user
 * @apiGroup Users
 *
 *
 * @apiSuccess {Object} userData User model with permissions.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "userData": {
 *                "id": 10,
 *                "firstname": "test",
 *                "lastname": "test",
 *                "email": "mail@gmail.com",
 *                "type": 4,
 *                "status": 2,
 *                "avatar": null,
 *                "file": {
 *                    "filename": "somefilename.png"
 *                },
 *                "permissions": [
 *                    {
 *                        "module": "users",
 *                        "read": 1,
 *                        "create": 1,
 *                        "update": 1,
 *                        "delete": 1
 *                    },
 *                    {
 *                        "module": "categories",
 *                        "read": 1,
 *                        "create": 1,
 *                        "update": 1,
 *                        "delete": 1
 *                    },
 *                    {
 *                        "module": "books",
 *                        "read": 1,
 *                        "create": 1,
 *                        "update": 1,
 *                        "delete": 1
 *                    },
 *                    {
 *                        "module": "authors",
 *                        "read": 1,
 *                        "create": 1,
 *                        "update": 1,
 *                        "delete": 1
 *                    }
 *                ]
 *            },
 *        }
 *    }
 *
 * @apiError NotAuthorized 401 Not authorized
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError Error 400 Other error
 *
 * @apiErrorExample {json} NotAuthorized:
 *     HTTP/1.1 401
 *     {
 *        "status": 401,
 *        "result": {
 *            "error": "You are not authorized"
 *        }
 *     }
 * @apiErrorExample {json} UserIsNotExists:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "User is not exists"
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
router.get('/current-user', jsonParser, auth, currentUser);

/**
 * @api {get} /users/:id Get user
 * @apiVersion 0.0.1
 * @apiName Get user
 * @apiGroup Users
 *
 * @apiParam {Number} id Id of user
 *
 * @apiSuccess {Object} userData User model.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "userData": {
 *                "id": 10,
 *                "firstname": "test",
 *                "lastname": "test",
 *                "email": "mail@gmail.com",
 *                "type": 4,
 *                "status": 2,
 *                "avatar": null
 *            },
 *        }
 *    }
 *
 * @apiError NotAuthorized 401 Not authorized
 * @apiError NotAllowed 403 Not allowed
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError SuchUserIsNotExists 400 User for getting is not exists
 * @apiError Error 400 Other error
 *
 * @apiErrorExample {json} NotAuthorized:
 *     HTTP/1.1 401
 *     {
 *        "status": 401,
 *        "result": {
 *            "error": "You are not authorized"
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
 * @apiErrorExample {json} UserIsNotExists:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "User is not exists"
 *        }
 *     }
 *
 * @apiErrorExample {json} SuchUserIsNotExists:
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
router.get('/:id', jsonParser, auth, isPermission(modules.USERS, actions.READ), getUser);

/**
 * @api {delete} /users/:id Delete user
 * @apiVersion 0.0.1
 * @apiName Delete user
 * @apiGroup Users
 *
 * @apiParam {Number} id Id of user
 *
 * @apiSuccess {number} user User id.
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "user": 3
 *        }
 *    }
 *
 *
 * @apiError NotAllowed 403 Not allowed
 * @apiError NotAuthorized 401 Not authorized
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError TryDeleteSuperAdmin 400 Super admin cannot be deleted
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
 * @apiErrorExample {json} TryDeleteSuperAdmin:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "You cannot delete super admin"
 *        }
 *     }
 * @apiErrorExample {json} Error:
 *     HTTP/1.1 400
 *     {
 *       "status": 400,
 *       "result": {
 *            "error": "Something went wrong"
 *       }
 *     }
 */
router.delete('/:id', jsonParser, auth, isPermission(modules.USERS, actions.DELETE), deleteUserMiddleware, deleteUser);

module.exports = router;
