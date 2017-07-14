const Suggestions = require('../../models/suggestions')
    , writeResponse = require('../../helpers/response').writeResponse
    , writeError = require('../../helpers/response').writeError
    , loginRequired = require('../../middlewares/loginRequired')
    , dbUtils = require('../../neo4j/dbUtils')
    , _ = require('lodash');


/**
 * @swagger
 * definition:
 *   Suggestion:
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
 * /api/v0/suggestions/create-from-tag:
 *   post:
 *     tags:
 *     - suggestions
 *     description: Creates a new suggestion from a tag
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

exports.createFromTag = function (req, res, next) {

};

/**
 * @swagger
 * /api/v0/suggestions/update:
 *   post:
 *     tags:
 *     - suggestions
 *     description: Updates an suggestion
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
 * /api/v0/suggestions/delete:
 *   post:
 *     tags:
 *     - suggestions
 *     description: Deletes an suggestion
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
 * /api/v0/suggestions/batch-create-from-meanings:
 *   post:
 *     tags:
 *     - suggestions
 *     description: Creates suggestions from meanings
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

exports.batchCreateFromMeanings = function (req, res, next) {
    Suggestions.batchCreateFromMeanings(dbUtils.getSession(req))
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};