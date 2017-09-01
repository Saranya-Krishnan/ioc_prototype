const Suggestions = require('../../models/suggestions')
    , writeResponse = require('../../helpers/response').writeResponse
    , writeError = require('../../helpers/response').writeError
    , loginRequired = require('../../middlewares/loginRequired')
    , dbUtils = require('../../neo4j/dbUtils')
    , _ = require('lodash');

exports.create = function (req, res, next) {
    const meaningId = _.get(req.body, 'meaningId');
    const schemaName = _.get(req.body, 'schemaName');
    const label = _.get(req.body, 'label');
    Suggestions.create(dbUtils.getSession(req), meaningId, schemaName, label)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};


exports.update = function (req, res, next) {

};


exports.deletion = function (req, res, next) {

};


exports.getSuggestions = function (req, res, next) {
    const tagId = _.get(req.body, 'tagId');
    Suggestions.getSuggestions(dbUtils.getSession(req), tagId)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};

exports.getAllSuggestions = function (req, res, next) {
    Suggestions.getAllSuggestions(dbUtils.getSession(req))
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};