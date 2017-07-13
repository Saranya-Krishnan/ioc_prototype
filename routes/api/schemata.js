const Schemata = require('../../models/schemata')
    , writeResponse = require('../../helpers/response').writeResponse
    , writeError = require('../../helpers/response').writeError
    , loginRequired = require('../../middlewares/loginRequired')
    , dbUtils = require('../../neo4j/dbUtils')
    , _ = require('lodash');


/**
 * @swagger
 * definition:
 *   Schema:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       url:
 *         type: string
 *       classificationData:
 *          type: string
 */
/**
 * @swagger
 * /api/v0/schemata/create:
 *   post:
 *     tags:
 *     - schemata
 *     description: Creates a new schema
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

exports.create = function (req, res, next) {

};

/**
 * @swagger
 * /api/v0/schemata/update:
 *   post:
 *     tags:
 *     - schemata
 *     description: Updates an schema
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
 * /api/v0/schemata/delete:
 *   post:
 *     tags:
 *     - schemata
 *     description: Deletes an schema
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
 * /api/v0/schemata/bind-tag:
 *   post:
 *     tags:
 *     - schemata
 *     description: Associates a schema to a tag
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


exports.bindTag = function (req, res, next) {

};


/**
 * @swagger
 * /api/v0/schemata/bind-meaning:
 *   post:
 *     tags:
 *     - schemata
 *     description: Associates a schema to a meaning
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


exports.bindMeaning = function (req, res, next) {

};

/**
 * @swagger
 * /api/v0/schemata/seed:
 *   post:
 *     tags:
 *     - schemata
 *     description: Checks to see if schemata are in db if not seed them from config
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

exports.seed = function (req, res, next) {
    const schemata = _.get(req.body,'schemata');
    Schemata.seed(dbUtils.getSession(req),schemata)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};