const Works = require('../../models/works')
    , writeResponse = require('../../helpers/response').writeResponse
    , writeError = require('../../helpers/response').writeError
    , loginRequired = require('../../middlewares/loginRequired')
    , dbUtils = require('../../neo4j/dbUtils')
    , _ = require('lodash');

exports.create = function (req, res, next) {
    const imageId = _.get(req.body, 'imageId');
    const userId = _.get(req.body,'userId');
    const notebookId = _.get(req.body,'notebookId');
    const title = _.get(req.body,'title');
    const description = _.get(req.body,'description');
    Works.create(dbUtils.getSession(req), imageId, userId, notebookId, title, description)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};

exports.update = function (req, res, next) {

};

exports.deletion = function (req, res, next) {

};

exports.display = function (req, res, next) {
    const workId = _.get(req.body, 'workId');
    Works.display(dbUtils.getSession(req), workId)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};

exports.mine = function (req, res, next) {
    const userId = _.get(req.body,'userId');
    Works.mine(dbUtils.getSession(req), userId)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};

exports.getAll = function (req, res, next) {
    Works.getAll(dbUtils.getSession(req))
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};