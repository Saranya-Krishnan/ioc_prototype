import uuid from 'uuid';
import Quest from './neo4j_models/quest';


const create = function (session, suggestionId, userId) {
    const questId = uuid.v4();
    return session.run('CREATE (quest:Quest {id:{questId}}) RETURN quest', { questId:questId }
        ).then(results => {
            const questResult = results;
            return session.run('MATCH (quest:Quest {id:{questId}}) MATCH (user:User {id:{userId}}) MATCH (suggestion:Suggestion {id:{suggestionId}}) CREATE (suggestion)<-[:SUGGESTED_BY]-(quest) CREATE (user)-[:IS_PARTICIPATING_IN]->(quest) CREATE (user)-[:IS_ON_A_QUEST_FROM]->(suggestion)',{ questId:questId, suggestionId:suggestionId, userId:userId }
            ).then(qResults => {
                return new Quest(questResult.records[0].get('quest'))
            })
        })
};

const update = function (session) {

};

const deletion = function (session) {

};


module.exports = {
    create: create,
    update: update,
    deletion: deletion
};