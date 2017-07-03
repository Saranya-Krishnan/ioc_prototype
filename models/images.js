import uuid from 'uuid';
import _ from 'lodash';
import Image from './neo4j_models/image';

const locate = function (session) {

};

const classify = function (session) {

};

const create = function (session, signature, width, height, format, url, secure_url, illustration_score, grayscale, original_filename) {
    return session.run('MATCH (image:Image {url:{url}}) RETURN image', {url:url})
        .then(results => {
            if(!_.isEmpty(results.records)){
               throw {url: 'Image already in use', status: 400}
            }else{
                return session.run('CREATE (image:Image {id: {id}, ' +
                    'signature:{signature},' +
                    ' width:{width},' +
                    ' height:{height},' +
                    ' format:{format},' +
                    ' url:{url},' +
                    ' secure_url:{secure_url},' +
                    ' illustration_score:{illustration_score}, ' +
                    ' grayscale:{grayscale}, ' +
                    ' original_filename:{original_filename}}) ' +
                    'RETURN image',
                    {
                        id: uuid.v4(),
                        signature:signature,
                        width:width,
                        height:height,
                        format:format,
                        url:url,
                        secure_url:secure_url,
                        illustration_score:illustration_score,
                        grayscale:grayscale,
                        original_filename:original_filename
                    }
                )
            }
        }
    ).then(results => {
            return new Image(results.records[0].get('image'));
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