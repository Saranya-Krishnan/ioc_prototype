import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import ajax from 'superagent';
import { Segment } from 'semantic-ui-react';
import * as ImageUploaderActions from '../actions/image-uploader_actions'

class ImageUploader extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.onImageDrop = this.onImageDrop.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }
    onImageDrop(files) {
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
                    // JFIFVersion:imageResponse.JFIFVersion,
                    // colors: imageResponse.colors,
                    // predominant:imageResponse.predominant,
                    // phash:imageResponse.phash,
                    illustration_score:imageResponse.illustration_score,
                    grayscale:imageResponse.grayscale,
                    original_filename:imageResponse.original_filename
                };

                console.log('FROM Upload',JSON.stringify(newImage));


                this.saveImage(JSON.stringify(newImage));
                if (response.body.secure_url !== '') {
                    this.setState({
                        uploadedFileCloudinaryUrl: response.body.secure_url
                    });
                }
            }
        });
    }
    saveImage(data){
        ajax.post(process.env.BASE_API_URL+'api/v0/images/create')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    console.log('FROM save',response);
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
                            <div>
                                <img src={this.state.uploadedFileCloudinaryUrl} />
                            </div>}
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
        createImage: (image,user) =>{
            dispatch(ImageUploaderActions.createImage(image,user))
        },
        createArtwork: (image,user) =>{
            dispatch(ImageUploaderActions.createArtwork(image,user))
        },
        classifyImage: (image) =>{
            dispatch(ImageUploaderActions.classifyImage(image))
        },
        createTags: (artwork) =>{
            dispatch(ImageUploaderActions.createTags(artwork))
        },
        rejectTag: (tag) =>{
            dispatch(ImageUploaderActions.rejectTag(tag))
        },
        exploreBasedOnThisArtwork: (artwork) =>{
            dispatch(ImageUploaderActions.exploreBasedOnThisArtwork(artwork))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['ImageUploader']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader);