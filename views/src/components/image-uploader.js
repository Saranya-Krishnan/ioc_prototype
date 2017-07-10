import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import ajax from 'superagent';
import { Link } from 'react-router-dom';
import { Segment, Image, Loader, Dimmer } from 'semantic-ui-react';
import * as ImageUploaderActions from '../actions/image-uploader_actions'
import PathHelper from '../helpers/path-helper';

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.onImageDrop = this.onImageDrop.bind(this);
        this.checkTagsCompleted = this.checkTagsCompleted.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.setUser = this.setUser.bind(this);
        this.tagCreationCount = 0;
    }
    setUser(data){
        this.userId = data.id;
    }
    onImageDrop(files) {
        this.setUser(this.props.user['userInfo']);
        this.setState({
            uploadedFile: files[0], hasUploaded:true
        });
        this.handleImageUpload(files[0]);
    }
    handleImageUpload(file) {
        this.setState({isLoading:true});
        let upload = ajax.post(process.env.CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);
        upload.end((err, response) => {
            if (err) {
                this.setState({isLoading:false, hasUploaded:false});
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
                    JFIFVersion:imageResponse.JFIFVersion ? JSON.stringify(imageResponse.JFIFVersion) : "{}",
                    colors: JSON.stringify(imageResponse.colors),
                    predominant: JSON.stringify(imageResponse.predominant),
                    phash:imageResponse.phash ? JSON.stringify(imageResponse.phash) : "{}",
                    illustration_score:imageResponse.illustration_score,
                    grayscale:imageResponse.grayscale,
                    original_filename:imageResponse.original_filename
                };
                this.createImage(JSON.stringify(newImage),this.userId);
                if (response.body.secure_url !== '') {
                    this.setState({
                        uploadedFileCloudinaryUrl: response.body.secure_url, isLoading:false
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
                    this.currentImageID = response.body.id;
                    this.visualRecognition(response.body.url);
                } else {
                    console.log('Error saving your image', error);
                }
            });
    }
    visualRecognition(url){
        this.setState({isProcessing:true});
        const data = {
            url: url
        };
        ajax.post(PathHelper.apiPath + '/watson/visual-recognition')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    this.classifyImage(response.text, this.currentImageID);
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
                    this.classificationToTags(response.body.classification);
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
                    this.setState({newArtWorkId:response.body.id});
                } else {
                    console.log('Error saving your image', error);
                }
            });
    }
    classificationToTags(classifications){
        let classificationData = JSON.parse(classifications);
        classificationData = JSON.parse(classificationData);
        this.classifiers = classificationData.images[0].classifiers[0].classes;
        for(let i=0; i<this.classifiers.length; i++){
            let w = this.classifiers[i].class;
            this.createTag(w);
        }
    }
    checkTagsCompleted(){
        console.log(this.tagCreationCount+' vs '+this.classifiers.length*2);
        if(this.tagCreationCount>=(this.classifiers.length*2)){
            this.setState({isProcessing:false});
            this.setState({isProcessed:true});
        }
    }
    createTag(word){
        const createTagData ={
            word:word
        };
        ajax.post( PathHelper.apiPath + '/tags/create/')
            .set('Content-Type', 'application/json')
            .send(createTagData)
            .end((error, response) => {
                if (!error && response) {
                    this.tagCreationCount++;
                    this.getNewTagOntology(response);
                    this.checkTagsCompleted();
                } else {
                    this.tagCreationCount++;
                    console.log('Error saving your Tag', error);
                    this.checkTagsCompleted();
                }
            });
    }
    getNewTagOntology(data){
        ajax.post( PathHelper.apiPath + '/tags/ontology/')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    this.enrichNewTag(response);
                } else {
                    console.log('Error saving your Tag', error);
                }
            });
    }
    enrichNewTag(data){
        ajax.post( PathHelper.apiPath + '/tags/enrich/')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    this.tagCreationCount++;
                    this.checkTagsCompleted();
                } else {
                    console.log('Error saving your Tag', error);
                    this.tagCreationCount++;
                    this.checkTagsCompleted();
                }
            });
    }
    render() {
        return (
            <Segment className="image-uploader-hold">
                { this.state.hasUploaded === true ? null :
                    <h1>Upload your Moleskine artwork.</h1>
                }
                <form>
                    { this.state.hasUploaded === true ? null :
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
                        {this.state.isLoading === true ?
                        <Dimmer active>
                            <Loader indeterminate>Uploading Image</Loader>
                        </Dimmer> : null
                        }
                        {this.state.isProcessing === true && this.state.hasUploaded === true ?
                        <Dimmer active>
                            <Loader indeterminate>Processing Image</Loader>
                        </Dimmer> : null
                        }
                        {this.state.uploadedFileCloudinaryUrl === '' ? null :
                            <div className="uploaded-image-holder">
                                <Image src={this.state.uploadedFileCloudinaryUrl} className="uploaded-image"/>
                            </div>
                        }
                        {this.state.isProcessed === true ?
                            <Link className="view-artwork-button" to={"/user/artwork/"+this.state.newArtWorkId}>
                                View My New Artwork
                            </Link>
                          : null
                        }
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
    createTag: PropTypes.func.isRequired,
    getNewTagOntology: PropTypes.func.isRequired,
    enrichNewTag: PropTypes.func.isRequired,
    exploreBasedOnThisArtwork: PropTypes.func.isRequired,
    classificationToTags: PropTypes.func.isRequired,
    visualRecognition: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    hasUploaded: PropTypes.bool,
    isProcessing: PropTypes.bool,
    isProcessed: PropTypes.bool,
    newArtWorkId: PropTypes.string,
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
        createTag: (word) =>{
            dispatch(ImageUploaderActions.createTag(word))
        },
        enrichNewTag: (tag) =>{
            dispatch(ImageUploaderActions.enrichNewTag(tag))
        },
        getNewTagOntology: (tag) =>{
            dispatch(ImageUploaderActions.getNewTagOntology(tag))
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