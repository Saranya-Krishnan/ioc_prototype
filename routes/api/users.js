const Users = require('../../models/users')
    , writeResponse = require('../../helpers/response').writeResponse
    , writeError = require('../../helpers/response').writeError
    , loginRequired = require('../../middlewares/loginRequired')
    , dbUtils = require('../../neo4j/dbUtils')
    , _ = require('lodash');
/**
 * @swagger
 * definition:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       email:
 *         type: string
 *       firstName:
 *          type: string
 *       lastName:
 *          type: string
 *       password:
 *          type: string
 */

/**
 * @swagger
 * /api/v0/register:
 *   post:
 *     tags:
 *     - users
 *     description: Register a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *             email:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: Your new user
 *         schema:
 *           $ref: '#/definitions/User'
 *       400:
 *         description: Error message(s)
 */
exports.register = function (req, res, next) {
    const email = _.get(req.body, 'email');
    const password = _.get(req.body, 'password');
    const firstName = _.get(req.body, 'firstName');
    const lastName = _.get(req.body, 'lastName');

    if (!email) {
        throw {username: 'This field is required.', status: 400};
    }
    if (!password) {
        throw {password: 'This field is required.', status: 400};
    }

    Users.register(dbUtils.getSession(req), email, password, firstName, lastName)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};

/**
 * @swagger
 * /api/v0/login:
 *   post:
 *     tags:
 *     - users
 *     description: Login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: succesful login
 *         schema:
 *           properties:
 *             token:
 *               type: string
 *       400:
 *         description: invalid credentials
 */
exports.login = function (req, res, next) {
    const email = _.get(req.body, 'email');
    const password = _.get(req.body, 'password');

    if (!email) {
        throw {username: 'This field is required.', status: 400};
    }
    if (!password) {
        throw {password: 'This field is required.', status: 400};
    }
    Users.login(dbUtils.getSession(req), email, password)
        .then(response => writeResponse(res, response))
        .catch(next);
};

/**
 * @swagger
 * /api/v0/users/me:
 *   get:
 *     tags:
 *     - users
 *     description: Get your user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         type: string
 *         required: true
 *         description: Token (token goes here)
 *     responses:
 *       200:
 *         description: the user
 *         schema:
 *           $ref: '#/definitions/User'
 *       401:
 *         description: invalid / missing authentication
 */
exports.me = function (req, res, next) {
    loginRequired(req, res, () => {
        const authHeader = req.headers['authorization'];
        const match = authHeader.match(/^Token (\S+)/);
        if (!match || !match[1]) {
            throw {message: 'invalid authorization format. Follow `Token <token>`', status: 401};
        }
        const token = match[1];
        Users.me(dbUtils.getSession(req), token)
            .then(response => writeResponse(res, response))
            .catch(next);
    })
};

/**
 * @swagger
 * /api/v0/user/delete:
 *   post:
 *     tags:
 *     - tags
 *     description: Deletes a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */


exports.deletion = function (req, res, next) {

};

/**
 * @swagger
 * /api/v0/user/update:
 *   post:
 *     tags:
 *     - tags
 *     description: Updates a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */


exports.update = function (req, res, next) {

};

/**
 * @swagger
 * /api/v0/user/update-preferences:
 *   post:
 *     tags:
 *     - tags
 *     description: Updates a user's preferences
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */


exports.updatePreferences = function (req, res, next) {
    const userId = _.get(req.body, 'userId');
    const preferences = _.get(req.body, 'preferences');
    Users.updatePreferences(dbUtils.getSession(req), userId, preferences)
        .then(response => writeResponse(res, response))
        .catch(next);
};

