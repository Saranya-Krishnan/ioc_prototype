import uuid from 'uuid';
import Work from './neo4j_models/work';
import Image from './neo4j_models/image';
import User from './neo4j_models/user';

const create = function (session, imageId, userId) {
    const artworkID = uuid.v4();
    return session.run('CREATE (work:Work {id: {id}}) RETURN work', {id: artworkID}
    ).then(results => {
        return new Work(results.records[0].get('work'));
    }
)
};

const update = function (session) {

};

const deletion = function (session) {

};
const display = function (session, workId, userId) {
    return session.run('MATCH (work:Work {id:{id}})<-[:DISPLAYS]-(i) MATCH (work:Work {id:{id}})<-[:CREATED]-(u) MATCH (image:Image {id:i.id}) MATCH (user:User {id:u.id}) RETURN work, image, user',{id:workId}
    ).then(results => {

            const u = results.records[0].get('user');
            if (u.properties.id !== userId) {
                return {
                    work: new Work(results.records[0].get('work')),
                    image: new Image(results.records[0].get('image'))
                };
            } else {
                return {
                    work: new Work(results.records[0].get('work')),
                    image: new Image(results.records[0].get('image')),
                    user: new User(results.records[0].get('user')),
                };
            }

    })
};

module.exports = {
    create: create,
    update: update,
    deletion: deletion,
    display: display
};