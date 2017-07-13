import uuid from 'uuid';
import Schema from './neo4j_models/schema';
import _ from 'lodash';

const create = function (session, schemaName) {
    const schemaId = uuid.v4();
    return session.run('MATCH (schema:Schema {schemaName:{schemaName}}) RETURN schema', { schemaName:schemaName })
        .then(results => {
            if (!_.isEmpty(results.records)) {
                return new Schema(results.records[0].get('schema'));
            } else {
                return session.run('CREATE (schema:Schema {id: {id}, schemaName:{schemaName}) RETURN schema',{ id:schemaId, schemaName:schemaName})
                    .then(results => {
                            return new Schema(results.records[0].get('schema'));
                        }
                    )
            }
        })
};

const update = function (session) {

};

const deletion = function (session) {

};

const bindTag = function (session) {

};

const bindMeaning = function (session) {

};

const seed = function (session, schemata) {
    for(let i=0; i< schemata.length; i++){
        schemata[i].id = uuid.v4();
    }
    return session.run('MATCH (schema:Schema {schemaName:{schemaName}}) RETURN schema', { schemaName: schemata[0].schemaName}
    ).then(results => {
        if (!_.isEmpty(results.records)) {
            console.log('schema present. checked ', schemata[0].schemaName);
        } else {
            return session.run('UNWIND {schemata} AS map CREATE (s:Schema) SET s=map', { schemata:schemata })
                .then(results => {
                    console.log('schema initialized', results);
                })
        }
    });
};

module.exports = {
    bindTag:bindTag,
    bindMeaning:bindMeaning,
    create: create,
    update: update,
    deletion: deletion,
    seed:seed
};