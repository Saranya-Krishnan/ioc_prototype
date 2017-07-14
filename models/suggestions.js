import uuid from 'uuid';
import Suggestion from './neo4j_models/suggestion';
const IoCSeed = require('../ioc.seed');
const suggestionBox = [];

const create = function (session) {

};

const update = function (session) {

};


const getASuggestion = function(meaning){
    const schemaName = meaning.properties.schemaName;
    if(schemaName!==undefined){
        if(IoCSeed.suggestionData[schemaName] && schemaName!=='none'){
            const schema =IoCSeed.suggestionData[schemaName];
            for(let x=0; x<schema.actions.length; x++){
                const pString = schema.actions[x].prompt;
                const spString = pString.split(' ');
                for(let y=0; y<spString.length; y++){
                    let article = null;
                    if(/\b[aeiou]\w*/ig.test(meaning.properties.label)){
                        article ='an';
                    }else{
                        article ='a';
                    }
                    spString[y] = spString[y].replace(/%&.*&%/,article);
                    spString[y] = spString[y].replace(/%\^.*\^%/,meaning.properties.label);
                }
                let suggestion = {
                    meaningId: meaning.properties.id,
                    prompt:spString.join(' ')
                };
                suggestionBox.push(suggestion);
            }
        }
    }
};

const batchCreateFromMeanings = function(session){
    return session.run('MATCH (n:Meaning {lastUpdate:{lastUpdate}}) RETURN n LIMIT 100',{lastUpdate:'new'}
        ).then(results => {
                for(let i=0; i<results.records.length; i++){
                    let examined = results.records[i].get('n');
                    getASuggestion(examined);
                }
                return session.run('UNWIND {suggestionBox} AS box CREATE (suggestion:Suggestion) SET suggestion=box',{suggestionBox:suggestionBox}
                ).then(sResults=> {

                });
            }
        )
};

//MATCH (t:Tag {id:'b635ec21-c9b2-41d6-9325-dcd51e05832b'}) MATCH (meaning:Meaning)-[:ASSOCIATED_WITH]->(t) MATCH(m:Meaning {id:m.id}) MATCH(s:Suggestion {meaningId:m.id}) RETURN s

const deletion = function (session) {

};

module.exports = {
    create: create,
    update: update,
    deletion: deletion,
    batchCreateFromMeanings:batchCreateFromMeanings
};