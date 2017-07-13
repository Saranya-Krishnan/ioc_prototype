import uuid from 'uuid';
import Tag from './neo4j_models/tag';

import _ from 'lodash';

const create = function (session, word) {
    const tagId = uuid.v4();
    return session.run('MATCH (tag:Tag {word:{word}}) RETURN tag', { word:word })
        .then(results => {
            if (!_.isEmpty(results.records)) {
                return new Tag(results.records[0].get('tag'));
            } else {
                return session.run('CREATE (tag:Tag {id: {id}, word:{word}, ontology:{ontology}}) RETURN tag',{ id:tagId, word:word, ontology:"{}"})
            .then(results => {
                    return new Tag(results.records[0].get('tag'));
                }
            )
            }
        })
};


const createFromImage = function (session, word, imageId) {
    const tagId = uuid.v4();
    return session.run('MATCH (tag:Tag {word:{word}}) RETURN tag', { word:word })
        .then(results => {
            if (!_.isEmpty(results.records)) {
                return session.run('MATCH (tag:Tag {id:{tagId}}) MATCH (image:Image {id:{imageId}}) CREATE(image)-[:ASSOCIATED_WITH]->(tag) RETURN tag',{imageId:imageId, tagId:tagId}
                ).then(tResults => {
                        return new Tag(results.records[0].get('tag'));
                    }
                )
            } else {
                return session.run('CREATE (tag:Tag {id: {id}, word:{word}, ontology:{ontology}}) RETURN tag',{ id:tagId, word:word, ontology:"{}"})
                    .then(results => {
                            const tagResults = results;
                            return session.run('MATCH (tag:Tag {id:{tagId}}) MATCH (image:Image {id:{imageId}}) CREATE(image)-[:ASSOCIATED_WITH]->(tag) RETURN tag',{imageId:imageId, tagId:tagId}
                            ).then(tResults => {
                                    return new Tag(tagResults.records[0].get('tag'));
                                }
                            )
                        }
                    )
            }
        }
    )
};

const tagItem = function (session) {

};

const enrich = function (session, info, word, id) {
    return session.run('MATCH (tag:Tag {id:{id},word:{word}}) SET tag.ontology = {info} RETURN tag',{word:word, id:id, info:info})
        .then(results => {
                return new Tag(results.records[0].get('tag'));
            }
        )
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
    tagItem: tagItem,
    createFromImage: createFromImage
};