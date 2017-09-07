import uuid from 'uuid';
import Location from './neo4j_models/location';

const create = function (session) {

};

const createFromMeaning = function (session) {

};

const update = function (session) {

};

const deletion = function (session) {

};

const display = function (session, locationsId) {
    return session.run('MATCH (l:Location {id:{locationsId}}) RETURN l',{locationsId:locationsId}
    ).then(results => {
        return new Location(results.records[0].get('l'));
    })
};

module.exports = {
    create: create,
    createFromMeaning:createFromMeaning,
    update: update,
    deletion: deletion,
    display: display
};