const Meanings = require('../../models/meanings')
    , writeResponse = require('../../helpers/response').writeResponse
    , writeError = require('../../helpers/response').writeError
    , loginRequired = require('../../middlewares/loginRequired')
    , dbUtils = require('../../neo4j/dbUtils')
    , _ = require('lodash');


exports.extractFromTag = function (req, res, next) {
    const tagId = _.get(req.body,'tagId');
    const ontology = _.get(req.body,'ontology');
    Meanings.extractFromTag(dbUtils.getSession(req),tagId, ontology)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};

exports.update = function (req, res, next) {

};

exports.deletion = function (req, res, next) {

};


exports.retrieve = function (req, res, next) {
    const suggestionId = _.get(req.body,'suggestionId');
    Meanings.retrieve(dbUtils.getSession(req),suggestionId)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};