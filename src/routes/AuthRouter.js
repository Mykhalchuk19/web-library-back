const express = require('express');

const router = express.Router();
const jsonParser = express.json();
const { AuthController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

const {
  createUser,
  authenticateUser,
  activateAccount,
  forgotPassword,
  resetPassword,
} = AuthController;
const {
  createUserMiddleware,
  authUserMiddleware,
  activateAccountMiddleware,
  forgotPasswordMiddleware,
  resetPasswordMiddleware,
} = AuthMiddleware;

/**
 * @api {post} /auth/signup Sign Up
 * @apiVersion 0.0.1
 * @apiName Sign Up
 * @apiGroup Authorization
 *
 * @apiParam {String} username Username of user
 * @apiParam {String} password Password of user
 * @apiParam {String} firstname First name of user
 * @apiParam {String} lastname Last name of user
 * @apiParam {String} email Email of user
 *
 * @apiSuccess {string} success Success message
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "success": "Check your email address"
 *    }
 *
 *
 * @apiError MissingFields 400 Missing fields
 * @apiError UniqueUsername 400 Username should be unique
 * @apiError UniqueEmail 400 Email should be unique
 * @apiError Error 400 Other error
 *
 * @apiErrorExample {json} MissingFields:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "You need to input all fields"
 *        }
 *     }
 *
 * @apiErrorExample {json} UniqueUsername:
 *    HTTP/1.1 400
 *    {
 *        "status": 400,
 *        "result": {
 *            "error": "Username should be unique"
 *        }
 *    }
 *
 * @apiErrorExample {json} UniqueEmail:
 *    HTTP/1.1 400
 *    {
 *        "status": 400,
 *        "result": {
 *            "error": "Email should be unique"
 *        }
 *    }
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
router.post('/signup', jsonParser, createUserMiddleware, createUser);

/**
 * @api {post} /auth/signin Sign In
 * @apiVersion 0.0.1
 * @apiName Sign In
 * @apiGroup Authorization
 *
 * @apiParam {String} username Username of user
 * @apiParam {String} password Password of user
 *
 * @apiSuccess {Object} userData User model with permissions.
 * @apiSuccess {string} token JWT token
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
 *            "token": "sometokenhwt23423423423fdfgdfhdfhfghgfhfgh"
 *        }
 *    }
 *
 *
 * @apiError MissingFields 400 Missing fields
 * @apiError IncorrectCredentials 400 Incorrect credentials
 * @apiError InactiveStatus 400 Status is not active
 * @apiError Error 400 Other error
 *
 * @apiErrorExample {json} MissingFields:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "You need to input all fields"
 *        }
 *     }
 *
 * @apiErrorExample {json} IncorrectCredentials:
 *    HTTP/1.1 400
 *    {
 *        "status": 400,
 *        "result": {
 *            "error": "Password or username are incorrect"
 *        }
 *    }
 *
 * @apiErrorExample {json} InactiveStatus:
 *    HTTP/1.1 400
 *    {
 *        "status": 400,
 *        "result": {
 *            "error": "Your status is not active"
 *        }
 *    }
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
router.post('/signin', jsonParser, authUserMiddleware, authenticateUser);

/**
 * @api {post} /auth/activate-account Activate account
 * @apiVersion 0.0.1
 * @apiName Activate account
 * @apiGroup Authorization
 *
 * @apiParam {String} code Activation code of user
 * @apiParam {Number} id Id of user
 *
 * @apiSuccess {Object} userData User model with permissions.
 * @apiSuccess {string} token JWT token
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
 *            "token": "sometokenhwt23423423423fdfgdfhdfhfghgfhfgh"
 *        }
 *    }
 *
 *
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError IncorrectActivationCode 400 Incorrect activation code
 * @apiError Error 400 Other error
 *
 * @apiErrorExample {json} UserIsNotExists:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "User is not exists"
 *        }
 *     }
 *
 * @apiErrorExample {json} IncorrectActivationCode:
 *    HTTP/1.1 400
 *    {
 *        "status": 400,
 *        "result": {
 *            "error": "Activation code is incorrect"
 *        }
 *    }
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
router.post('/activate-account', jsonParser, activateAccountMiddleware, activateAccount);

/**
 * @api {post} /auth/forgot-password Forgot password
 * @apiVersion 0.0.1
 * @apiName Forgot password
 * @apiGroup Authorization
 *
 * @apiParam {String} email Email of user
 *
 * @apiSuccess {Object} success Success message
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "success": "Check your email address"
 *        }
 *    }
 *
 *
 * @apiError EmailIsNotExists 400 Email is not exists
 * @apiError Error 400 Other error
 *
 * @apiErrorExample {json} EmailIsNotExists:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "This email is not exists"
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
router.post('/forgot-password', jsonParser, forgotPasswordMiddleware, forgotPassword);

/**
 * @api {post} /auth/reset-password Reset password
 * @apiVersion 0.0.1
 * @apiName Reset password
 * @apiGroup Authorization
 *
 * @apiParam {Number} id Id of user
 * @apiParam {String} code Restore code of user
 * @apiParam {String} password New password of user
 *
 * @apiSuccess {Object} success Success message
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *
 *    {
 *        "status": 200,
 *        "result": {
 *            "success": "Your password was reset successfully"
 *        }
 *    }
 *
 *
 * @apiError UserIsNotExists 400 User is not exists
 * @apiError IncorrectCode 400 Reset password code is incorrect
 * @apiError Error 400 Other error
 *
 * @apiErrorExample {json} EmailIsNotExists:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "This user is not exists"
 *        }
 *     }
 *
 * @apiErrorExample {json} IncorrectCode:
 *     HTTP/1.1 400
 *     {
 *        "status": 400,
 *        "result": {
 *            "error": "Reset password code is incorrect"
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
router.post('/reset-password', jsonParser, resetPasswordMiddleware, resetPassword);

module.exports = router;
