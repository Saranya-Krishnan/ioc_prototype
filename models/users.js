import uuid from 'uuid';
import randomstring from "randomstring";
import _ from 'lodash';
import User from './neo4j_models/user';
import Notebook from './neo4j_models/notebook';
import crypto from 'crypto';

const register = function (session, email, password, firstName, lastName, bio, avatar) {
    return session.run('MATCH (user:User {email: {email}}) RETURN user', {email: email})
        .then(results => {
            if (!_.isEmpty(results.records)) {
                throw {err: 'username already in use', status: 400}
            } else {
                return session.run('CREATE (user:User {id: {id}, email: {email}, password: {password}, firstName: {firstName}, lastName:{lastName}, bio:{bio}, avatar:{avatar} api_key: {api_key}}) RETURN user',
                    {
                        id: uuid.v4(),
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        password: hashPassword(email, password),
                        bio:bio,
                        avatar: avatar,
                        api_key: randomstring.generate({
                            length: 20,
                            charset: 'hex'
                        })
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
               return {noSignedIn:true}
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

const updateCurrentNotebook = function (session, userId, notebookId) {
    return session.run('MATCH(n:Notebook {id:{notebookId}}) MATCH (u:User {id:{userId}}) MATCH(u)-[r:CURRENT_NOTEBOOK_OF]-() DELETE r CREATE (n)<-[:CURRENT_NOTEBOOK_OF]-(u) RETURN n', {notebookId:notebookId, userId:userId}
    ).then(results=> {
        return new Notebook(results.records[0].get('n'));
    });
};

const getCurrentNotebook = function (session,userId) {
    return session.run('MATCH (u:User {id:{userId}})-[:CURRENT_NOTEBOOK_OF]->(n:Notebook) RETURN n', {userId:userId}
    ).then(results=> {
        if(results.records[0]){
            return new Notebook(results.records[0].get('n'));
        }else{
            return {noCurrentNotebook:true};
        }
    });
};


const update = function (session, userId, username, firstName, lastName, bio, avatar) {
    return session.run('MATCH (u:User {id:{userId}}) SET u.email = {email}, u.firstName={firstName}, u.lastName={lastName}, u.bio={bio}, u.avatar={avatar} RETURN u', {userId:userId, email:username, firstName:firstName, lastName:lastName, bio:bio, avatar:avatar}
    ).then(results=> {
        return new User(results.records[0].get('u'));
    });
};

function hashPassword(username, password) {
    let s = username + ':' + password;
    return crypto.createHash('sha256').update(s).digest('hex');
}

module.exports = {
    register: register,
    me: me,
    login: login,
    updateCurrentNotebook: updateCurrentNotebook,
    getCurrentNotebook:getCurrentNotebook,
    update: update
};
