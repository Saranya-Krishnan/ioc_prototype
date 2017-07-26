const Meanings = require('../../models/meanings')
    , writeResponse = require('../../helpers/response').writeResponse
    , writeError = require('../../helpers/response').writeError
    , loginRequired = require('../../middlewares/loginRequired')
    , dbUtils = require('../../neo4j/dbUtils')
    , _ = require('lodash');


/**
 * @swagger
 * definition:
 *   Meaning:
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
 * /api/v0/meanings/extract-from-tag:
 *   post:
 *     tags:
 *     - meanings
 *     description: Creates a new meaning from a tag's ontology
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

exports.extractFromTag = function (req, res, next) {
    const tagId = _.get(req.body,'tagId');
    const ontology = _.get(req.body,'ontology');
    Meanings.extractFromTag(dbUtils.getSession(req),tagId, ontology)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};

/**
 * @swagger
 * /api/v0/meanings/update:
 *   post:
 *     tags:
 *     - meanings
 *     description: Updates an meaning
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
 * /api/v0/meanings/delete:
 *   post:
 *     tags:
 *     - meanings
 *     description: Deletes an meaning
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
 * /api/v0/meanings/retrieve:
 *   post:
 *     tags:
 *     - meanings
 *     description: Gets a meaning from a suggestion
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


exports.retrieve = function (req, res, next) {
    const suggestionId = _.get(req.body,'suggestionId');
    Meanings.retrieve(dbUtils.getSession(req),suggestionId)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};