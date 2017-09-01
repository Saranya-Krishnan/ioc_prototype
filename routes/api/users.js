const Users = require('../../models/users')
    , writeResponse = require('../../helpers/response').writeResponse
    , writeError = require('../../helpers/response').writeError
    , loginRequired = require('../../middlewares/loginRequired')
    , dbUtils = require('../../neo4j/dbUtils')
    , _ = require('lodash');

exports.register = function (req, res, next) {
    const email = _.get(req.body, 'email');
    const password = _.get(req.body, 'password');
    const firstName = _.get(req.body, 'firstName');
    const lastName = _.get(req.body, 'lastName');
    const bio = _.get(req.body, 'bio');
    const avatar = _.get(req.body, 'avatar');
    if (!email) {
        throw {username: 'This field is required.', status: 400};
    }
    if (!password) {
        throw {password: 'This field is required.', status: 400};
    }

    Users.register(dbUtils.getSession(req), email, password, firstName, lastName, bio, avatar)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};

exports.login = function (req, res, next) {
    const email = _.get(req.body, 'email');
    const password = _.get(req.body, 'password');

    if (!email) {
        throw {username: 'This field is required.', status: 400};
    }
    if (!password) {
        throw {password: 'This field is required.', status: 400};
    }
    Users.login(dbUtils.getSession(req), email, password)
        .then(response => writeResponse(res, response))
        .catch(next);
};

exports.me = function (req, res, next) {
    loginRequired(req, res, () => {
        const authHeader = req.headers['authorization'];
        const match = authHeader.match(/^Token (\S+)/);
        if (!match || !match[1]) {
            throw {message: 'invalid authorization format. Follow `Token <token>`', status: 401};
        }
        const token = match[1];
        Users.me(dbUtils.getSession(req), token)
            .then(response => writeResponse(res, response))
            .catch(next);
    })
};

exports.deletion = function (req, res, next) {

};

exports.update = function (req, res, next) {
    const userId = _.get(req.body, 'userId');
    const username = _.get(req.body, 'username');
    const firstName = _.get(req.body, 'firstName');
    const lastName = _.get(req.body, 'lastName');
    const bio = _.get(req.body, 'bio');
    const avatar = _.get(req.body, 'avatar');
    Users.update(dbUtils.getSession(req), userId, username, firstName, lastName, bio, avatar)
        .then(response => writeResponse(res, response, 201))
        .catch(next);
};

exports.updateCurrentNotebook = function (req, res, next) {
    const userId = _.get(req.body, 'userId');
    const notebookId = _.get(req.body, 'notebookId');
    console.log('user', userId, 'notebook', notebookId);
    Users.updateCurrentNotebook(dbUtils.getSession(req), userId, notebookId)
        .then(response => writeResponse(res, response))
        .catch(next);
};


exports.getCurrentNotebook = function (req, res, next) {
    const userId = _.get(req.body, 'userId');
    Users.getCurrentNotebook(dbUtils.getSession(req), userId)
        .then(response => writeResponse(res, response))
        .catch(next);
};

