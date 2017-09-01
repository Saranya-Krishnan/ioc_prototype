import uuid from 'uuid';
import Suggestion from './neo4j_models/suggestion';
const IoCSeed = require('../ioc.seed');

const create = function (session, meaningId, schemaName, label) {
    if(schemaName!==undefined){
        if(IoCSeed.suggestionData[schemaName] && schemaName!=='none'){
            const schema =IoCSeed.suggestionData[schemaName];
            for(let x=0; x<schema.actions.length; x++){
                const pString = schema.actions[x].prompt;
                const spString = pString.split(' ');
                for(let y=0; y<spString.length; y++){
                    let article = null;
                    if(/\b[aeiou]\w*/ig.test(label)){
                        article ='an';
                    }else{
                        article ='a';
                    }
                    spString[y] = spString[y].replace(/%&.*&%/,article);
                    spString[y] = spString[y].replace(/%\^.*\^%/,label);
                }
                let suggestionId = uuid.v4();
                let prompt = spString.join(' ');
                return session.run('CREATE (s:Suggestion {id:{suggestionId}, prompt:{prompt}}) RETURN s',{suggestionId:suggestionId, prompt:prompt }
                ).then(firstResults => {
                    return session.run('MATCH (m:Meaning {id:{meaningId}}) MATCH(s:Suggestion {id:{suggestionId}}) CREATE (s)<-[:CAME_FROM_THIS_MEANING]-(m) RETURN s',{suggestionId:suggestionId,meaningId:meaningId}
                    ).then(secondResults => {
                        return new Suggestion(secondResults.records[0].get('s'));
                    });
                });

            }
        }
    }

};

const update = function (session) {

};

const getSuggestions = function (session, tagId) {
    return session.run('MATCH (t:Tag {id:{tagId}}) MATCH (meaning:Meaning)-[:DERIVED_FROM]->(t) MATCH(m:Meaning {id:meaning.id}) MATCH (s:Suggestion)<-[:CAME_FROM_THIS_MEANING]-(m) RETURN s', {tagId:tagId}
    ).then(results => {
        const suggestionGroup = [];
        let aSuggestion = null;
        for(let n=0; n<results.records.length; n++){
            aSuggestion = new Suggestion(results.records[n].get('s'));
            suggestionGroup.push(aSuggestion);
        }
        return JSON.stringify(suggestionGroup);
    });
};


const getAllSuggestions = function (session) {
    return session.run('MATCH (s:Suggestion) RETURN s LIMIT 25'
    ).then(results => {
        const suggestionGroup = [];
        let aSuggestion = null;
        for(let n=0; n<results.records.length; n++){
            aSuggestion = new Suggestion(results.records[n].get('s'));
            suggestionGroup.push(aSuggestion);
        }
        return suggestionGroup;
    });
};

const deletion = function (session) {

};

module.exports = {
    create: create,
    update: update,
    deletion: deletion,
    getSuggestions:getSuggestions,
    getAllSuggestions: getAllSuggestions
};