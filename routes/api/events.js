const Events = require('../../models/events')
    , writeResponse = require('../../helpers/response').writeResponse
    , writeError = require('../../helpers/response').writeError
    , loginRequired = require('../../middlewares/loginRequired')
    , dbUtils = require('../../neo4j/dbUtils')
    , _ = require('lodash');


exports.getMine = function (req, res, next) {
    const userId = _.get(req.body,'userId');
    Events.getMine(dbUtils.getSession(req), userId)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};