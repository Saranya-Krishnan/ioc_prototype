import uuid from 'uuid';
import Notebook from './neo4j_models/notebook';


const create = function (session) {

};

const update = function (session) {

};

const deletion = function (session) {

};

const mine = function (session, userId) {
    return session.run('MATCH ({id:{userId}})-[:OWNS_THIS_BOOK]->(n:Notebook) MATCH ({id:n.id})<-[:IS_BOUND_IN]-(pg) MATCH(p:Page {id:pg.id}) RETURN n,p',{userId:userId}
    ).then(results => {
        if(results.records.length===0){
            return {noteBooksFound:0}
        }
        const notebooks =[];
        const pages =[];
        for(let i=0; i<results.records.length;i++){
            let aNotebook = new Work(results.records[i].get('n'));
            notebooks.push(aNotebook);
            let aPage = new Image(results.records[i].get('p'));
            pages.push(aPage);
        }
        return {
            notebooks: notebooks,
            pages: pages,
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