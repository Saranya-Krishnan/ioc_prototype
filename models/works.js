import uuid from 'uuid';
import Work from './neo4j_models/work';


const create = function (session, imageId, userId) {
    const artworkID = uuid.v4();
    return session.run('CREATE (work:Work {id: {id}}) ' +
        ' RETURN work ',
        {
            id: artworkID
        }
    ).then(results => {
            const artResults = results;
            return session.run('MATCH (work:Work {id:{artworkID}}) CREATE(user {id:{userId}})-[:CREATED]->(work) CREATE(image {id:{imageId}})-[:DISPLAYS]->(work)', {artworkID:artworkID, userId:userId, imageId:imageId}
            ).then(mResults => {
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


module.exports = {
    create: create,
    update: update,
    deletion: deletion
};