const Works = require('../../models/works')
    , writeResponse = require('../../helpers/response').writeResponse
    , writeError = require('../../helpers/response').writeError
    , loginRequired = require('../../middlewares/loginRequired')
    , dbUtils = require('../../neo4j/dbUtils')
    , _ = require('lodash');

/**
 * @swagger
 * definition:
 *   Work:
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
 * /api/v0/works/create:
 *   post:
 *     tags:
 *     - works
 *     description: Creates a new work
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
    const imageId = _.get(req.body, 'imageId');
    const userId = _.get(req.body,'userId');
    Works.create(dbUtils.getSession(req), imageId, userId)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};
/**
 * @swagger
 * /api/v0/works/update:
 *   post:
 *     tags:
 *     - works
 *     description: Updates an work
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
 * /api/v0/works/delete:
 *   post:
 *     tags:
 *     - works
 *     description: Deletes an work
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
 * /api/v0/works/display:
 *   post:
 *     tags:
 *     - works
 *     description: Displays a work for the creator of that work with editing capabilities.
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


exports.display = function (req, res, next) {
    const workId = _.get(req.body, 'workId');
    const userId = _.get(req.body,'userId');
    Works.display(dbUtils.getSession(req), workId, userId)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};