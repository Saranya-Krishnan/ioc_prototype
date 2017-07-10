import uuid from 'uuid';
import Tag from './neo4j_models/tag';
import _ from 'lodash';

const create = function (session, word) {
    const tagID = uuid.v4();
    return session.run('MATCH (tag:Tag {word:{word}}) RETURN tag', { word:word })
        .then(results => {
            if (!_.isEmpty(results.records)) {
                return new Tag(results.records[0].get('tag'));
            } else {
                return session.run('CREATE (tag:Tag {id: {id}, word:{word}, ontology:{ontology}}) RETURN tag',{ id:tagID, word:word, ontology:"{}"})
            }
        })
};

const tagItem = function (session) {

};

const enrich = function (session, info) {
    console.log('enrich',info);
    console.log('session');
};

const update = function (session) {

};

const deletion = function (session) {

};


module.exports = {
    create: create,
    update: update,
    deletion: deletion,
    enrich: enrich,
    tagItem: tagItem
};