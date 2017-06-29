import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import ajax from 'superagent';
import { Segment } from 'semantic-ui-react';
import * as ImageUploaderActions from '../actions/image-uploader_actions'

//ToDo: move to env var
const CLOUDINARY_UPLOAD_PRESET = 'iylswkmx';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/hpvmvlpcu/image/upload';

export default class ImageUploader extends Component {
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
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);
        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }
            if(response){
                this.saveImage(response);
                if (response.body.secure_url !== '') {
                    this.setState({
                        uploadedFileCloudinaryUrl: response.body.secure_url
                    });
                }
            }
        });
    }
    saveImage(data){
        const test = {"public_id":"jz6h0ldxnvay65oqihra",
            "version":1498127607,
            "signature":"8c658775bd5e2d837ba7d76a0ef0b23be0b7b51f",
            "width":686,
            "height":800,
            "format":"jpg",
            "resource_type":"image",
            "created_at":"2017-06-22T10:33:27Z",
            "tags":[],
            "pages":1,
            "bytes":74855,
            "type":"upload",
            "etag":"3ad1a573b6f4326e0524c3fac3f0e071",
            "url":"http://res.cloudinary.com/hpvmvlpcu/image/upload/v1498127607/jz6h0ldxnvay65oqihra.jpg",
            "secure_url":"https://res.cloudinary.com/hpvmvlpcu/image/upload/v1498127607/jz6h0ldxnvay65oqihra.jpg",
            "image_metadata":{
                "JFIFVersion":"1.01",
                "ResolutionUnit":"inches",
                "XResolution":"72",
                "YResolution":"72",
                "Colorspace":"GRAY"
            },
            "colors":[
                ["#030303",69.4],
                ["#F8F8F8",27.8]
            ],
            "predominant":{
            "google":[
                ["black",69.4],
                ["white",27.8]
                ]
            },
            "phash":"d393644e93af2b90",
            "coordinates":{
            "faces":[]
            },
            "illustration_score":1.0,
            "semi_transparent":false,
            "grayscale":true,
            "original_filename":"3998295_orig"
        };
        ajax.post('http://localhost:3030/api/images/create')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(data))
            .end((error, response) => {
                if (!error && response) {
                    //Todo: Create ArtWork

                } else {
                    console.log('Error submitting your credentials', error);
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
                                <p>{this.state.uploadedFile.name}</p>
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
    uploadedFileCloudinaryUrl: PropTypes.string,
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