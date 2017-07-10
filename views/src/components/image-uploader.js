import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import ajax from 'superagent';
import { Segment, Image, Loader, Dimmer } from 'semantic-ui-react';
import * as ImageUploaderActions from '../actions/image-uploader_actions'
import PathHelper from '../helpers/path-helper';

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.onImageDrop = this.onImageDrop.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.setUser = this.setUser.bind(this);
        this.isLoading =false;
        this.isProcessing = false;
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
        this.isLoading =true;
        let upload = ajax.post(process.env.CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);
        upload.end((err, response) => {
            if (err) {
                this.isLoading =false;
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
                    this.isLoading = false;
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
        this.isProcessing = true;
        const data = {
            url: url
        };
        ajax.post(PathHelper.apiPath + '/watson/visual-recognition')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    console.log('WATSON', response.text);
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
                    console.log('FROM classify',response);
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
                    console.log('FROM save artwork',response);
                    this.artWorkId = response.body.id;
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
            console.log(w);
            this.createTag(w);
        }
        //ToDo: Fix to show only after completed tags created.
        this.isProcessing = false;
    }
    createTag(word){
        const createTagData ={
            word:word
        };
        ajax.post( PathHelper.apiPath + '/tags/create/ontology')
            .set('Content-Type', 'application/json')
            .send(createTagData)
            .end((error, response) => {
                if (!error && response) {
                    console.log('FROM create Tags',response);
                } else {
                    console.log('Error saving your Tag', error);
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
                        {this.isLoading === false ? null :
                        <Dimmer active>
                            <Loader indeterminate>Uploading Image</Loader>
                        </Dimmer>
                        }
                        {this.isProcessing === false ? null :
                        <Dimmer active>
                            <Loader indeterminate>Processing Image</Loader>
                        </Dimmer>
                        }
                        {this.state.uploadedFileCloudinaryUrl === '' ? null :
                            <div>
                                <Image src={this.state.uploadedFileCloudinaryUrl} />
                            </div>
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
        createTag: (word) =>{
            dispatch(ImageUploaderActions.createTags(word))
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