const Locations = require('../../models/locations')
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

exports.display = function (req, res, next) {

};

exports.createFromMeaning = function (req, res, next) {
    const meaningId = _.get(req.body,'meaningId');
    const label = _.get(req.body,'label');
    const latitude = _.get(req.body,'latitude');
    const longitude = _.get(req.body,'longitude');
    Locations.extractFromTag(dbUtils.getSession(req),meaningId, label, latitude, longitude)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};