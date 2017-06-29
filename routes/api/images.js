const Images = require('../../models/images')
    , writeResponse = require('../../helpers/response').writeResponse
    , writeError = require('../../helpers/response').writeError
    , loginRequired = require('../../middlewares/loginRequired')
    , dbUtils = require('../../neo4j/dbUtils')
    , _ = require('lodash');


/**
 * @swagger
 * definition:
 *   Image:
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
 * /api/v0/classify:
 *   post:
 *     tags:
 *     - images
 *     description: Sends an image for classification
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
 *         description: Classification Data
 *       400:
 *         description: Error message(s)
 */


exports.classify = function (req, res, next) {

};

/**
 * @swagger
 * /api/v0/images/locate:
 *   post:
 *     tags:
 *     - images
 *     description: Enriches images with location data based on Exif
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
 *         description: Location Data
 *       400:
 *         description: Error message(s)
 */


exports.locate = function (req, res, next) {

};

/**
 * @swagger
 * /api/v0/images/create:
 *   post:
 *     tags:
 *     - images
 *     description: Creates a new image
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
 * /api/v0/images/update:
 *   post:
 *     tags:
 *     - images
 *     description: Updates an image
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
 * /api/v0/images/delete:
 *   post:
 *     tags:
 *     - images
 *     description: Deletes an image
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


exports.delete = function (req, res, next) {

};