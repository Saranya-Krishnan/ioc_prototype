import uuid from 'uuid';
import Work from './neo4j_models/work';
import Image from './neo4j_models/image';
import User from './neo4j_models/user';
import Tag from './neo4j_models/tag';

const create = function (session, imageId, userId, notebookId) {
    const artworkId = uuid.v4();
    return session.run('CREATE (work:Work {id: {id}}) RETURN work', {id: artworkId}
    ).then(results => {
        const artResults = results;
        return session.run('MATCH (work:Work {id:{artworkId}}) MATCH(notebook:Notebook {id:{notebookId}}) CREATE (user {id:{userId}})-[:CREATED]->(work) CREATE(image {id:{imageId}})<-[:DISPLAYS]-(work) CREATE((work)-[:IS_PART_OF_THIS_NOTEBOOK]->(notebook))', {
                artworkId: artworkId,
                userId: userId,
                imageId: imageId,
                notebookId:notebookId
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
    return session.run('MATCH (work:Work {id:{id}})-[:DISPLAYS]->(i) MATCH (work:Work {id:{id}})<-[:CREATED]-(u) MATCH (work:Work {id:{id}})-[:ASSOCIATED_WITH]->(t) MATCH(tag:Tag {id:t.id}) MATCH (user:User {id:u.id}) MATCH (image:Image {id:i.id}) RETURN work, image, user, tag',{id:workId}
    ).then(results => {
        const workTags =[];
        for(let i=0; i<results.records.length;i++){
            let aTag = new Tag(results.records[i].get('tag'));
            workTags.push(aTag);
        }
        return {
            work: new Work(results.records[0].get('work')),
            image: new Image(results.records[0].get('image')),
            user: new User(results.records[0].get('user')),
            tags: workTags
        };
    })
};

const mine = function (session, userId){
    return session.run('MATCH ({id:{userId}})-[:CREATED]->(w:Work) MATCH ({id:w.id})-[:DISPLAYS]->(im) MATCH(i:Image {id:im.id}) RETURN i,w',{userId:userId}
    ).then(results => {
        const works =[];
        const images =[];
        for(let i=0; i<results.records.length;i++){
            let aWork = new Work(results.records[i].get('w'));
            works.push(aWork);
            let anImage = new Image(results.records[i].get('i'));
            images.push(anImage);
        }
        return {
            work: works,
            image: images
        }
    })
};

module.exports = {
    create: create,
    update: update,
    deletion: deletion,
    display: display,
    mine: mine
};