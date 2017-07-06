import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import ajax from 'superagent';
import { Segment, Image } from 'semantic-ui-react';
import * as ImageUploaderActions from '../actions/image-uploader_actions'
import PathHelper from '../helpers/path-helper';

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.onImageDrop = this.onImageDrop.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.setUser = this.setUser.bind(this);
    }
    setUser(data){
        this.userId = data.id;
    }
    onImageDrop(files) {
        this.setUser(this.props.user['userInfo']);
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }
    handleImageUpload(file) {
        let upload = ajax.post(process.env.CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);
        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }
            if(response){
                const imageResponse = response.body;
                const newImage = {
                    url: imageResponse.url,
                    format: imageResponse.format,
                    signature: imageResponse.signature,
                    width: imageResponse.width,
                    height: imageResponse.height,
                    secure_url: imageResponse.secure_url,
                    //ToDo: add these params back
                    // JFIFVersion:imageResponse.JFIFVersion,
                    // colors: imageResponse.colors,
                    // predominant:imageResponse.predominant,
                    // phash:imageResponse.phash,
                    illustration_score:imageResponse.illustration_score,
                    grayscale:imageResponse.grayscale,
                    original_filename:imageResponse.original_filename
                };
                this.createImage(JSON.stringify(newImage),this.userId);
                if (response.body.secure_url !== '') {
                    this.setState({
                        uploadedFileCloudinaryUrl: response.body.secure_url
                    });
                }
            }
        });
    }
    createImage(image,userId){
        let d = JSON.parse(image);
        d.userId = userId;
        const imageData = JSON.stringify(d);
        ajax.post( PathHelper.apiPath + '/images/create')
            .set('Content-Type', 'application/json')
            .send(imageData)
            .end((error, response) => {
                if (!error && response) {
                    console.log('FROM save',response);
                    this.currentImageID = response.body.id;
                    this.visualRecognition(response.body.url);
                } else {
                    console.log('Error saving your image', error);
                }
            });
    }
    visualRecognition(url){
        const data = {
            api_key: process.env.WATSON_API_KEY,
            url: url,
            version: '2016-05-20',
            classifier_ids: 'default,moleskine_71136762'
        };
        ajax.post(PathHelper.apiPath + '/proxy/watson/visual-recognition')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    console.log('WATSON', response);
                    this.classifyImage(response, this.currentImageID);
                } else {
                    console.log('Error saving your image', error);
                }
            });
    }
    classifyImage(recognition, imageId){
        const data = {
            recognition: JSON.stringify(recognition),
            imageId: imageId
        };
        ajax.post( PathHelper.apiPath + '/images/classify')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    console.log('FROM classify',response);
                    this.createArtWork(this.currentImageID, this.userId);
                } else {
                    console.log('Error saving your image', error);
                }
            });
    }
    createArtWork(imageId,userId){
        const createData = {
            imageId:imageId,
            userId:userId
        };
        let data = JSON.stringify(createData);
        ajax.post( PathHelper.apiPath + '/works/create')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    console.log('FROM save artwork',response);
                    this.artWorkId = response.body.id;
                    this.classificationToTags(response.body.classification)
                } else {
                    console.log('Error saving your image', error);
                }
            });
    }
    classificationToTags(classifications){
        //Parse classification

        // Loop create Tag

    }
    createTags(imageId,artworkId){
        const createTagData ={
            imageId:imageId,
            artworkId: artworkId
        };
        ajax.post( PathHelper.apiPath + '/tags/create')
            .set('Content-Type', 'application/json')
            .send(createTagData)
            .end((error, response) => {
                if (!error && response) {
                    console.log('FROM create Tags',response);
                } else {
                    console.log('Error saving your image', error);
                }
            });
    }
    render() {
        return (
            <Segment>
                <h1>Upload your Moleskine artwork.</h1>
                <form>
                    {this.state.uploadedFileCloudinaryUrl === '' ? null :
                    <div className="FileUpload">
                        <Dropzone
                            onDrop={this.onImageDrop.bind(this)}
                            multiple={false}
                            accept="image/*"
                            className="uploader-zone"
                            activeClassName="uploader-zone-active"
                            rejectClassName="uploader-zone-rejected">
                            <div>Drop an image or click to select a file to upload.</div>
                        </Dropzone>
                    </div>}
                    <div>
                        {this.state.uploadedFileCloudinaryUrl === '' ? null :
                            <Segment>
                                <Image src={this.state.uploadedFileCloudinaryUrl} />
                            </Segment>}
                    </div>
                </form>
            </Segment>
        )
    }
}

ImageUploader.propTypes = {
    uploadImage: PropTypes.func.isRequired,
    uploadedFileCloudinaryUrl: PropTypes.any,
    uploadedFile: PropTypes.any,
    createImage: PropTypes.func.isRequired,
    createArtwork: PropTypes.func.isRequired,
    classifyImage: PropTypes.func.isRequired,
    createTags: PropTypes.func.isRequired,
    rejectTag: PropTypes.func.isRequired,
    exploreBasedOnThisArtwork: PropTypes.func.isRequired,
    classificationToTags: PropTypes.func.isRequired,
    visualRecognition: PropTypes.func.isRequired,
    userInfo: PropTypes.shape({
        id: PropTypes.string,
        username:PropTypes.string,
        firstName:PropTypes.string,
        lastName:PropTypes.string
    })
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadImage: (image) => {
            dispatch(ImageUploaderActions.uploadImage(image))
        },
        createImage: (image) =>{
            dispatch(ImageUploaderActions.createImage(image))
        },
        createArtwork: (imageId,userId) =>{
            dispatch(ImageUploaderActions.createArtwork(imageId,userId))
        },
        classifyImage: (recognition, imageId) =>{
            dispatch(ImageUploaderActions.classifyImage(recognition,imageId))
        },
        createTags: (image, artwork) =>{
            dispatch(ImageUploaderActions.createTags(image,artwork))
        },
        rejectTag: (tag) =>{
            dispatch(ImageUploaderActions.rejectTag(tag))
        },
        exploreBasedOnThisArtwork: (artwork) =>{
            dispatch(ImageUploaderActions.exploreBasedOnThisArtwork(artwork))
        },
        classificationToTags: (classification) =>{
            dispatch(ImageUploaderActions.classificationToTags(classification))
        },
        visualRecognition: (url) =>{
            dispatch(ImageUploaderActions.visualRecognition(url))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['ImageUploader'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);