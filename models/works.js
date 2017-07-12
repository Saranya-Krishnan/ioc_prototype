import uuid from 'uuid';
import Work from './neo4j_models/work';
import Image from './neo4j_models/image';
import User from './neo4j_models/user';
import Tag from './neo4j_models/tag';

const create = function (session, imageId, userId) {
    const artworkId = uuid.v4();
    return session.run('CREATE (work:Work {id: {id}}) RETURN work', {id: artworkId}
    ).then(results => {
        const artResults = results;
        return session.run('MATCH (work:Work {id:{artworkId}}) CREATE(user {id:{userId}})-[:CREATED]->(work) CREATE(image {id:{imageId}})-[:DISPLAYS]->(work)', {
                artworkId: artworkId,
                userId: userId,
                imageId: imageId
            }
        ).then(thirdResults => {
             return session.run('MATCH (w:Work {id:{artworkId}}) MATCH (i:Image {id:{imageId}}) MATCH (i)-[:ASSOCIATED_WITH]->(t) WITH collect(t) as endNodes,w FOREACH(x in endNodes | CREATE (w)-[:ASSOCIATED_WITH]->(x))', {artworkId:artworkId,imageId:imageId }
                ).then(fourthResults => {
                        return new Work(artResults.records[0].get('work'));
                    }
                )
            })
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