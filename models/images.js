import uuid from 'uuid';
import _ from 'lodash';
import Image from './neo4j_models/image';

const locate = function (session) {

};

const classify = function (session, imageId, recognition) {
    return session.run ('MATCH (i { id: {imageId}}) SET i.classification = {recognition} RETURN i', {imageId:imageId,recognition:recognition})
        .then(results => {
            return new Image(results.records[0].get('i'));
        })
};

const create = function (session, signature, userId, width, height, format, url, secure_url, JFIFVersion, colors, predominant, phash, illustration_score, grayscale, original_filename) {
    const imageID = uuid.v4();
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
                        id: imageID,
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
            return session.run('MATCH (image:Image {id:{imageID}}) CREATE(user {id:{userId}})-[:UPLOADED]->(image)', {imageID:imageID, userId:userId}
            ).then(mResults => {
                return new Image(imgResults.records[0].get('image'));
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
    locate: locate,
    classify: classify,
    create: create,
    update: update,
    deletion: deletion
};