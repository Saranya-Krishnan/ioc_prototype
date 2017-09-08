import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import { Link } from 'react-router-dom';
import { Container, Image, Loader, Dimmer, Form, Button, Input, TextArea } from 'semantic-ui-react';
import * as ImageUploaderActions from '../actions/image-uploader_actions'
import PathHelper from '../helpers/path-helper';
import {toastr} from 'react-redux-toastr';
const FileInput = require('react-file-input');

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkTagsCompleted = this.checkTagsCompleted.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.setUser = this.setUser.bind(this);
        this.setFile = this.setFile.bind(this);
        this.isJSON = this.isJSON.bind(this);
        this.tagCreationCount = 0;
        this.stopper = false;
    }
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };
    setUser(data){
        this.userId = data.id;
        this.stopper = true;
    }
    setFile(event){
        const value = event.target.files[0];
        this.setState({uploadedFile:value, fileSet:true});
        if(!this.stopper){
            this.setUser(this.props.user['userInfo']);
        }
        event.preventDefault();
    }
    handleSubmit(event) {
        event.preventDefault();
        if(this.state.fileSet){
            this.setState({hasUploaded:true});
            this.handleImageUpload(this.state.uploadedFile);
        }else{
            toastr.warning('No file selected.');
        }
    }
    handleImageUpload(file) {
        this.setState({isLoading:true});
        let upload = ajax.post(process.env.CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);
        upload.end((err, response) => {
            if (err) {
                this.setState({isLoading:false, hasUploaded:false});
                toastr.error('Error Encountered', err);
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
                    toastr.success('Saving Image', 'This looks very promising.');
                } else {
                    toastr.error('Error saving your image', error);
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
                    toastr.success('Analyzing Image', 'Using IBM\'s Watson to determine what you\'ve uploaded.');
                } else {
                    toastr.error('Error analyzing your image', error);
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
                    toastr.success('Classifying Image', 'Adding tags and other data.');
                } else {
                    toastr.error('Error classifying your image', error);                }
            });
    }
    createArtWork(imageId,userId){
        const userData = {
            userId: userId
        };
        ajax.post( PathHelper.apiPath + '/users/get-current-notebook')
            .set('Content-Type', 'application/json')
            .send(userData)
            .end((error, response) => {
                if (!error && response) {
                    const res = response.body;
                    this.currentNotebook = res.id;
                    const createData = {
                        imageId:imageId,
                        userId:userId,
                        notebookId: this.currentNotebook,
                        title: this.state.title,
                        description: this.state.description
                    };
                    let data = JSON.stringify(createData);
                    ajax.post( PathHelper.apiPath + '/works/create')
                        .set('Content-Type', 'application/json')
                        .send(data)
                        .end((error, response) => {
                            if (!error && response) {
                                this.setState({newArtWorkId:response.body.id});
                                toastr.success('Creating Artwork', 'Copying your image to an artwork associated with your current notebook.');
                            } else {
                                toastr.error('Error saving your artwork', error);                            }
                        });
                } else {
                    console.log('error retrieving your quests', error);
                }
            });
    }
    isJSON(d){
        try {
            return JSON.parse(d);
        } catch(e){
            return d
        }
    }
    classificationToTags(classifications){
        let classificationData = this.isJSON(classifications);
        classificationData = this.isJSON(classificationData);
        if(classificationData.images) {
            this.classifiers = classificationData.images[0].classifiers[0].classes;
            //ToDo: Refactor to one unwind
            for (let i = 0; i < this.classifiers.length; i++) {
                let w = this.classifiers[i].class;
                this.createTag(w, this.currentImageID);
            }
        }else{
            this.checkTagsCompleted(true);
            toastr.error('Connection problem', 'There\'s a problem with the visual recognition service.');
        }
    }
    checkTagsCompleted(checksOut){
        this.checksOut = checksOut;
        if(!this.checksOut ) {
            if (this.tagCreationCount >= (this.classifiers.length * 2)) {
                this.checksOut = true;
            }
        }
        if(this.checksOut){
            this.setState({isProcessing:false});
            this.setState({isProcessed:true});
            this.createArtWork(this.currentImageID, this.userId);
        }
    }
    createTag(word,imageId){
        const createTagData ={
            word:word,
            imageId:imageId
        };
        ajax.post( PathHelper.apiPath + '/tags/create-from-image/')
            .set('Content-Type', 'application/json')
            .send(createTagData)
            .end((error, response) => {
                if (!error && response) {
                    this.tagCreationCount++;
                    this.getNewTagOntology(response);
                    this.checkTagsCompleted(false);
                } else {
                    this.tagCreationCount++;
                    toastr.error('Error saving your tag', error);
                    this.checkTagsCompleted(false);
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
                    toastr.success('Enriching Artwork', 'Finding out what those tags mean.');
                } else {
                    toastr.error('Error getting your ontology', error);
                }
            });
    }
    enrichNewTag(data){
        ajax.post( PathHelper.apiPath + '/tags/enrich/')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    this.makeMeaning(response);
                } else {
                    toastr.error('Error enriching your tag.', error);
                }
            });
    }
    makeMeaning(tag){
        const ontology = this.isJSON(tag.body.ontology);
        if(ontology.results && ontology.results.length){
            const data ={
                ontology: ontology,
                tagId: tag.body.id
            };
            ajax.post( PathHelper.apiPath + '/meanings/extract-from-tag/')
                .set('Content-Type', 'application/json')
                .send(data)
                .end((error, response) => {
                    if (!error && response) {
                        if(response.body.schemaName === 'place'){
                            this.getLocationMeaning(response);
                        }else{
                            this.makeSuggestions(response);
                            this.tagCreationCount++;
                            this.checkTagsCompleted(false);
                        }
                    } else {
                        toastr.error('Error extracting meaning from your tag.', error);
                        this.tagCreationCount++;
                        this.checkTagsCompleted(false);
                    }
                });
        }else{
            this.tagCreationCount++;
            this.checkTagsCompleted(false);
        }
    }

    makeMeaningLocation(meaning,location){
        const data = {
            meaningId: meaning.body.id,
            label: meaning.body.label,
            latitude: location.body.latitude,
            longitude: location.body.longitude
        };
        ajax.post( PathHelper.apiPath + '/locations/create-from-meaning/')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                this.makeSuggestions(meaning);
                this.tagCreationCount++;
                this.checkTagsCompleted(false);
                if (error && response) {
                    toastr.error('Error extracting a location from your meaning.', error);
                    this.tagCreationCount++;
                    this.checkTagsCompleted(false);
                }
            });
    }

    getLocationMeaning(meaning){
        const data = {
            label: meaning.body.label
        };
        ajax.post( PathHelper.apiPath + '/locations/get-geolocation/')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                this.makeMeaningLocation(meaning,response);
                toastr.success('Found a location from the meaning!', error);
                if (error && response) {
                    toastr.error('Error extracting a location from your meaning.', error);
                }
            });
    }
    makeSuggestions(meaning){
        if(meaning.body.schemaName && meaning.body.schemaName!=='none'){
            const data = {
                schemaName: meaning.body.schemaName,
                meaningId: meaning.body.id,
                label: meaning.body.label
            };
            ajax.post( PathHelper.apiPath + '/suggestions/create/')
                .set('Content-Type', 'application/json')
                .send(data)
                .end((error, response) => {
                    if (error && response) {
                        toastr.error('Error extracting a suggestion from your tag\'s meaning.', error);
                    }
                });
        }
    }
    render() {
        return (
            <Container className="image-uploader-hold">
                { this.state.hasUploaded === true ? null :
                    <div>
                        <h4>Upload your artwork from this Moleskine notebook.</h4>
                        <Form onSubmit={this.handleSubmit} inverted={true}>
                            <Form.Field name="title" control={Input} label='Title of work'  value={this.state.title} onChange={this.handleInputChange}/>
                            <Form.Field name="description" control={TextArea} label='Description' value={this.state.description} onChange={this.handleInputChange}/>
                            <label className="image-file">Image File</label>
                            <FileInput
                                name="imageFile"
                                accept=".png,.jpg,.jpeg"
                                placeholder="Avatar Image"
                                className="upload-button"
                                onChange={this.setFile}
                            />
                            <Button className="submit-button" floated={'right'}>Submit</Button>
                        </Form>
                    </div>
                }
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
                { this.state.hasUploaded === true ?
                    <Link className="view-artwork-button" to={"/artwork/"+this.state.newArtWorkId}>
                        View My New Artwork
                    </Link> : null
                }
            </Container>
        )
    }
}


ImageUploader.propTypes = {
    uploadImage: PropTypes.func.isRequired,
    uploadedFileCloudinaryUrl: PropTypes.any,
    uploadedFile: PropTypes.any,
    fileSet: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    createImage: PropTypes.func.isRequired,
    createArtwork: PropTypes.func.isRequired,
    classifyImage: PropTypes.func.isRequired,
    createTag: PropTypes.func.isRequired,
    getNewTagOntology: PropTypes.func.isRequired,
    enrichNewTag: PropTypes.func.isRequired,
    makeMeaning: PropTypes.func.isRequired,
    makeSuggestions: PropTypes.func.isRequired,
    exploreBasedOnThisArtwork: PropTypes.func.isRequired,
    classificationToTags: PropTypes.func.isRequired,
    visualRecognition: PropTypes.func.isRequired,
    getMeaningLocation: PropTypes.func.isRequired,
    makeMeaningLocation: PropTypes.func.isRequired,
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
        makeMeaning: (tag) =>{
            dispatch(ImageUploaderActions.makeMeaning(tag))
        },
        makeSuggestions: (meaning) =>{
            dispatch(ImageUploaderActions.makeSuggestions(meaning))
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
        },
        getMeaningLocation: (meaning) =>{
            dispatch(ImageUploaderActions.getMeaningLocation(meaning))
        },
        makeMeaningLocation: (meaning, location) =>{
            dispatch(ImageUploaderActions.makeMeaningLocation(meaning, location))
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