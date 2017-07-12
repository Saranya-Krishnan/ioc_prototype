import uuid from 'uuid';
import _ from 'lodash';
import Image from './neo4j_models/image';
import Tag from './neo4j_models/tag';

const locate = function (session) {

};

const classify = function (session, imageId, recognition) {
    return session.run ('MATCH (i { id: {imageId}}) SET i.classification = {recognition} RETURN i', {imageId:imageId,recognition:recognition})
        .then(results => {
            return new Image(results.records[0].get('i'));
        })
};

const create = function (session, signature, userId, width, height, format, url, secure_url, JFIFVersion, colors, predominant, phash, illustration_score, grayscale, original_filename) {
    const imageId = uuid.v4();
    return session.run('MATCH (image:Image {url:{url}}) RETURN image', {url:url})
        .then(results => {
            if(!_.isEmpty(results.records)){
               throw {url: 'Image already in use', status: 400}
            }else{
                return session.run('CREATE (image:Image {id: {id}, ' +
                    ' signature:{signature},' +
                    ' width:{width},' +
                    ' height:{height},' +
                    ' format:{format},' +
                    ' url:{url},' +
                    ' secure_url:{secure_url},' +
                    ' JFIFVersion:{JFIFVersion},' +
                    ' colors:{colors},' +
                    ' predominant:{predominant},' +
                    ' phash:{phash},' +
                    ' illustration_score:{illustration_score}, ' +
                    ' grayscale:{grayscale}, ' +
                    ' original_filename:{original_filename}, ' +
                    ' classification:{classification} } ) ' +
                    ' RETURN image ',
                    {
                        id: imageId,
                        signature:signature,
                        width:width,
                        height:height,
                        format:format,
                        url:url,
                        secure_url:secure_url,
                        JFIFVersion:JFIFVersion,
                        colors:colors,
                        predominant:predominant,
                        phash:phash,
                        illustration_score:illustration_score,
                        grayscale:grayscale,
                        original_filename:original_filename,
                        classification: ''
                    }
                )
            }
        }
    ).then(results => {
            const imgResults = results;
            return session.run('MATCH (image:Image {id:{imageId}}) CREATE(user {id:{userId}})-[:UPLOADED]->(image)', {imageId:imageId, userId:userId}
            ).then(mResults => {
                return new Image(imgResults.records[0].get('image'));
                }
            )
        }
    )
};

const update = function (session) {

};

const deletion = function (session, imageId, userId) {
    //ToDo: Ensure user id is the creator amd then delete
//MATCH (i:Image {id:'e420d9e7-0ba9-4b49-bc86-7e509307c753'}) OPTIONAL MATCH (i)-[r]-() DELETE i,r
};

const getTags = function(session, imageId){
    return session.run('MATCH (image:Image {id:{imageId}})-[:ASSOCIATED_WITH]->(t) MATCH (tag:Tag {id:t.id}) RETURN tag', {imageId:imageId}
    ).then(results => {
        const imageTags =[];
        for(let i=0; i<results.records.length;i++){
            let aTag = new Tag(results.records[i].get('tag'));
            imageTags.push(aTag);
        }
        return imageTags;
    })
};

module.exports = {
    locate: locate,
    classify: classify,
    create: create,
    update: update,
    deletion: deletion,
    getTags: getTags
};