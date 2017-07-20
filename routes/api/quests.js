const Quests = require('../../models/quests')
    , writeResponse = require('../../helpers/response').writeResponse
    , writeError = require('../../helpers/response').writeError
    , loginRequired = require('../../middlewares/loginRequired')
    , dbUtils = require('../../neo4j/dbUtils')
    , _ = require('lodash');

//ToDo: Update Swagger descriptions

/**
 * @swagger
 * definition:
 *   Quest:
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
 * /api/v0/quests/create:
 *   post:
 *     tags:
 *     - quests
 *     description: Creates a new quest
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
    const suggestionId = _.get(req.body,'suggestionId');
    const userId = _.get(req.body,'userId');
    const startDate = _.get(req.body,'startDate');
    const goalDate = _.get(req.body,'goalDate');
    const completed = _.get(req.body,'completed');
    const hidden = _.get(req.body,'hidden');
    const statement = _.get(req.body,'statement');
    Quests.create(dbUtils.getSession(req),suggestionId, userId, startDate, goalDate, completed, hidden, statement)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};

/**
 * @swagger
 * /api/v0/quests/update:
 *   post:
 *     tags:
 *     - quests
 *     description: Updates a quest
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *              questId:
 *                  type: String
 *                  description: The uuid of the quest to update
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */


exports.update = function (req, res, next) {
    const questId = _.get(req.body,'questId');
    const startDate = _.get(req.body,'startDate');
    const goalDate = _.get(req.body,'goalDate');
    const completed = _.get(req.body,'completed');
    const hidden = _.get(req.body,'hidden');
    const statement = _.get(req.body,'statement');
    Quests.update(dbUtils.getSession(req),questId, startDate, goalDate, completed, hidden, statement)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};

/**
 * @swagger
 * /api/v0/quests/delete:
 *   post:
 *     tags:
 *     - quests
 *     description: Deletes a quest
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *              questId: String - The uuid of the quest to delete
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */


exports.deletion = function (req, res, next) {
    const questId = _.get(req.body,'questId');
    Quests.deletion(dbUtils.getSession(req),questId)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};

/**
 * @swagger
 * /api/v0/quests/display:
 *   post:
 *     tags:
 *     - quests
 *     description: Displays a quest
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *              questId: String - The uuid of the quest to delete
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.display = function (req, res, next) {
    const questId = _.get(req.body,'questId');
    Quests.display(dbUtils.getSession(req), questId)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};


/**
 * @swagger
 * /api/v0/quests/my-quests:
 *   post:
 *     tags:
 *     - quests
 *     description: Retrieves a user's quests
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *     responses:
 *       201:
 *         description: Data
 *       400:
 *         description: Error message(s)
 */

exports.mine = function (req, res, next) {
    const userId = _.get(req.body,'userId');
    Quests.mine(dbUtils.getSession(req), userId)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};