import uuid from 'uuid';
import Quest from './neo4j_models/quest';
import Suggestion from './neo4j_models/suggestion';
import User from './neo4j_models/user';


const create = function (session, suggestionId, userId, startDate, goalDate, completed, hidden, statement) {
    const questId = uuid.v4();
    return session.run('CREATE (quest:Quest {id:{questId}, startDate:{startDate}, goalDate:{goalDate}, completed:{completed}, hidden:{hidden}, statement:{statement}}) RETURN quest', { questId:questId, startDate:startDate, goalDate:goalDate, completed:completed, hidden:hidden, statement:statement }
        ).then(results => {
            const questResult = results;
            return session.run('MATCH (quest:Quest {id:{questId}}) MATCH (user:User {id:{userId}}) MATCH (suggestion:Suggestion {id:{suggestionId}}) CREATE (suggestion)<-[:SUGGESTED_BY]-(quest) CREATE (user)-[:IS_PARTICIPATING_IN]->(quest) CREATE (user)-[:IS_ON_A_QUEST_FROM]->(suggestion)',{ questId:questId, suggestionId:suggestionId, userId:userId }
            ).then(qResults => {
                return new Quest(questResult.records[0].get('quest'))
            })
        })
};

const update = function (session, questId, startDate, goalDate, completed, hidden, statement) {
    return session.run('MATCH (update:Quest {id:{questId}}) SET update.startDate = {startDate}, update.goalDate = {goalDate}, update.completed = {completed}, update.hidden = {hidden}, update.statement = {statement} RETURN update',{questId:questId, startDate:startDate, goalDate:goalDate, completed:completed, hidden:hidden, statement:statement}
    ).then(results => {
        return new Quest(results.records[0].get('update'))
    })
};

const deletion = function (session, questId) {
    return session.run('MATCH (d:Quest {id:{questId}}) DETACH DELETE d',{questId:questId}
    ).then(results => {
        return {error:'Can not delete quest'}
    })
};


const display = function (session, questId) {
    return session.run('MATCH (q:Quest {id:{questId}}) MATCH (q)-[:SUGGESTED_BY]->(s:Suggestion) MATCH(u:User)-[:IS_PARTICIPATING_IN]->(q) RETURN q, s, u',{questId:questId}
    ).then(results => {
       const quest = new Quest(results.records[0].get('q'));
       const suggestion = new Suggestion(results.records[0].get('s'));
       const user = new User(results.records[0].get('u'));
       return{
           user: user,
           quest: quest,
           suggestion: suggestion
       }
    })
};

module.exports = {
    create: create,
    update: update,
    deletion: deletion,
    display: display
};