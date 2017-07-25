import uuid from 'uuid';
import Notebook from './neo4j_models/notebook';
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
                    return session.run('MATCH (nb:Notebook {id:{notebookId}}) CREATE (u:User {id:{userId}})-[:OWNS_THIS_BOOK]->(nb) RETURN nb', {
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
    //return session.run('MATCH ({id:{userId}})-[:OWNS_THIS_BOOK]->(n:Notebook) MATCH ({id:n.id})<-[:IS_BOUND_IN]-(pg) MATCH(p:Page {id:pg.id}) RETURN n,p',{userId:userId}

    return session.run('MATCH ({id:{userId}})-[:OWNS_THIS_BOOK]->(n) MATCH (notebook:Notebook {id:n.id}) RETURN notebook',{userId:userId}
    ).then(results => {
        if(results.records.length===0){
            return {noteBooksFound:0}
        }
        const notebooks =[];
        const pages =[];
        for(let i=0; i<results.records.length;i++){
            let aNotebook = new Notebook(results.records[i].get('notebook'));
            notebooks.push(aNotebook);
            // let aPage = new Image(results.records[i].get('p'));
            // pages.push(aPage);
        }
        return {
            notebooks: notebooks,
            //pages: pages,
            noteBooksFound: notebooks.length
        }
    })
};


module.exports = {
    create: create,
    update: update,
    deletion: deletion,
    mine: mine
};