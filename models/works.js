import uuid from 'uuid';
import Work from './neo4j_models/work';
import Image from './neo4j_models/image';
import User from './neo4j_models/user';
import Tag from './neo4j_models/tag';

const create = function (session, imageId, userId) {
    const artworkID = uuid.v4();
    return session.run('CREATE (work:Work {id: {id}}) RETURN work', {id: artworkID}
    ).then(results => {
            const artResults = results;
            return session.run('MATCH (work:Work {id:{artworkID}}) CREATE(user {id:{userId}})-[:CREATED]->(work) CREATE(image {id:{imageId}})-[:DISPLAYS]->(work)', {artworkID:artworkID, userId:userId, imageId:imageId}
            ).then(newResults => {
                    return new Work(artResults.records[0].get('work'));
                }
            )
        }
    )
};

const update = function (session) {

};

const deletion = function (session) {

};
const display = function (session, workId) {
    return session.run('MATCH (work:Work {id:{id}})<-[:DISPLAYS]-(i) MATCH (work:Work {id:{id}})<-[:CREATED]-(u) MATCH (user:User {id:u.id})  MATCH (image:Image {id:i.id}) RETURN work, image, user',{id:workId}
    ).then(results => {
        return {
            work: new Work(results.records[0].get('work')),
            image: new Image(results.records[0].get('image')),
            user: new User(results.records[0].get('user'))
        };
    })
};

module.exports = {
    create: create,
    update: update,
    deletion: deletion,
    display: display
};