import uuid from 'uuid';
import Event from './neo4j_models/events';

//ToDo: Event not currently a stored content type. Stub out only.

const getMine = function (session, userId) {
    return session.run('MATCH (u:User {id:{userId}}) MATCH (e:Quest)<-[:IS_PARTICIPATING_IN]-(u) RETURN e',{userId:userId}
    ).then(results => {
        const events =[];
        for(let i=0; i<results.records.length;i++){
            let anEvent = new Event(results.records[i].get('e'));
            events.push(anEvent);
        }
        return events;
    })
};


module.exports = {
    getMine:getMine
};