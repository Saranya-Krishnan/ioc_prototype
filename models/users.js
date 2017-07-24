import uuid from 'uuid';
import randomstring from "randomstring";
import _ from 'lodash';
import User from './neo4j_models/user';
import crypto from 'crypto';

const register = function (session, email, password, firstName, lastName) {
    return session.run('MATCH (user:User {email: {email}}) RETURN user', {email: email})
        .then(results => {
            if (!_.isEmpty(results.records)) {
                throw {err: 'username already in use', status: 400}
            }
            else {
                return session.run('CREATE (user:User {id: {id}, email: {email}, password: {password}, firstName: {firstName}, lastName:{lastName}, api_key: {api_key}, preferences:{preferences}}) RETURN user',
                    {
                        id: uuid.v4(),
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        password: hashPassword(email, password),
                        api_key: randomstring.generate({
                            length: 20,
                            charset: 'hex'
                        }),
                        preferences: '{}'
                    }
                ).then(results => {
                        return new User(results.records[0].get('user'));
                    }
                )
            }
        });
};
const me = function (session, apiKey) {
    return session.run('MATCH (user:User {api_key: {api_key}}) RETURN user', {api_key: apiKey})
        .then(results => {
            if (_.isEmpty(results.records)) {
                throw {message: 'invalid authorization key', status: 401};
            }
            return new User(results.records[0].get('user'));
        });
};

const login = function (session, email, password) {
    return session.run('MATCH (user:User {email: {email}}) RETURN user', {email: email})
        .then(results => {
                if (_.isEmpty(results.records)) {
                    throw {email: 'username does not exist', status: 400}
                }
                else {
                    const dbUser = _.get(results.records[0].get('user'), 'properties');
                    if (dbUser.password !== hashPassword(email, password)) {
                        throw {password: 'wrong password', status: 400}
                    }
                    return {token: _.get(dbUser, 'api_key')};
                }
            }
        );
};

const updatePreferences = function (session, email, preferences, userId) {
    //ToDo: Create update prefs call
};

function hashPassword(username, password) {
    let s = username + ':' + password;
    return crypto.createHash('sha256').update(s).digest('hex');
}

module.exports = {
    register: register,
    me: me,
    login: login,
    updatePreferences: updatePreferences
};
