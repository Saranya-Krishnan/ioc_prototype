import uuid from 'uuid';
import Notebook from './neo4j_models/notebook';
import Work from './neo4j_models/work';
import Image from './neo4j_models/image';
import _ from 'lodash';

const create = function (session, when, what, how, name1, name2, name3, userId) {
    const notebookId = uuid.v4();
    return session.run('MATCH (n:Notebook {id:{notebookId}}) RETURN n',{notebookId:notebookId}
        ).then(results => {
        if (!_.isEmpty(results.records)) {
            throw {url: 'Notebook already in use', status: 400}
        } else {
            return session.run('CREATE (notebook:Notebook {id:{notebookId}, when:{when}, how:{how}, name1:{name1}, name2:{name2}, name3:{name3}}) RETURN notebook', {
                    notebookId: notebookId,
                    when: when,
                    what: what,
                    how: how,
                    name1: name1,
                    name2: name2,
                    name3: name3
                }
            ).then(results => {
                    const notebook = new Notebook(results.records[0].get('notebook'));
                    return session.run('MATCH (nb:Notebook {id:{notebookId}}) MATCH (u:User {id:{userId}}) CREATE UNIQUE (u)-[:OWNS_THIS_BOOK]->(nb) CREATE UNIQUE (u)-[:CURRENT_NOTEBOOK_OF]->(nb) RETURN nb', {
                            notebookId: notebookId,
                            userId: userId
                        }
                    ).then(Nresults => {
                            return notebook;
                        }
                    )
                }
            )
        }
    })
};

const update = function (session3) {

};

const deletion = function (session) {

};

const mine = function (session, userId) {
    return session.run('MATCH ({id:{userId}})-[:OWNS_THIS_BOOK]->(n) MATCH (notebook:Notebook {id:n.id}) RETURN notebook',{userId:userId}
    ).then(results => {
        if(results.records.length===0){
            return {noteBooksFound:0}
        }
        const notebooks =[];
        for(let i=0; i<results.records.length;i++){
            let aNotebook = new Notebook(results.records[i].get('notebook'));
            notebooks.push(aNotebook);
        }
        return {
            notebooks: notebooks,
            noteBooksFound: notebooks.length
        }
    })
};

const artworkInNotebook = function (session, notebookId) {
    return session.run('MATCH ({id:{notebookId}})<-[:IS_PART_OF_THIS_NOTEBOOK]->(w) MATCH (work:Work {id:w.id}) MATCH ({id:w.id})-[:DISPLAYS]->(im) MATCH(image:Image {id:im.id}) RETURN work, image',{notebookId:notebookId}
    ).then(results => {
        const works =[];
        const images =[];
        for(let i=0; i<results.records.length;i++){
            let aWork = new Work(results.records[i].get('work'));
            works.push(aWork);
            let anImage = new Image(results.records[i].get('image'));
            images.push(anImage);
        }
        return {
            work: works,
            image: images
        }
    })
};

const display = function (session, notebookId) {
    return session.run('MATCH (n:Notebook {id:{notebookId}}) RETURN n',{notebookId:notebookId}
    ).then(results => {
        return new Notebook(results.records[0].get('n'));
    })
};

module.exports = {
    create: create,
    update: update,
    deletion: deletion,
    mine: mine,
    artworkInNotebook:artworkInNotebook,
    display: display
};