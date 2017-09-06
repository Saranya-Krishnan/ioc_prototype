const Pages = require('../../models/pages')
    , writeResponse = require('../../helpers/response').writeResponse
    , writeError = require('../../helpers/response').writeError
    , loginRequired = require('../../middlewares/loginRequired')
    , dbUtils = require('../../neo4j/dbUtils')
    , _ = require('lodash');

exports.create = function (req, res, next) {

};

exports.update = function (req, res, next) {

};

exports.deletion = function (req, res, next) {

};

exports.inNotebook = function (req, res, next) {
    const userId = _.get(req.body,'userId');
    const notebookId = _.get(req.body,'notebookId');
    Pages.inNotebook(dbUtils.getSession(req), userId, notebookId)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};