const Pages = require('../../models/pages')
    , writeResponse = require('../../helpers/response').writeResponse
    , writeError = require('../../helpers/response').writeError
    , loginRequired = require('../../middlewares/loginRequired')
    , dbUtils = require('../../neo4j/dbUtils')
    , _ = require('lodash');


/**
 * @swagger
 * definition:
 *   Page:
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
 * /api/v0/pages/create:
 *   post:
 *     tags:
 *     - pages
 *     description: Creates a new page
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
 * /api/v0/pages/update:
 *   post:
 *     tags:
 *     - pages
 *     description: Updates an page
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
 * /api/v0/pages/delete:
 *   post:
 *     tags:
 *     - pages
 *     description: Deletes an page
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
 * /api/v0/pages/in-notebook:
 *   post:
 *     tags:
 *     - pages
 *     description: Displays pages in a given notebook
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


exports.inNotebook = function (req, res, next) {
    const userId = _.get(req.body,'userId');
    const notebookId = _.get(req.body,'notebookId');
    Pages.inNotebook(dbUtils.getSession(req), userId, notebookId)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};