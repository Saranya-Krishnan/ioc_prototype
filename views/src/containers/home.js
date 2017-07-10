import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import * as ImageUploadCreators from '../actions/image-uploader_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import ImageUploader from '../components/image-uploader';
import { Container } from 'semantic-ui-react';

class Home extends Component {
    static propTypes = {
        home: PropTypes.object.isRequired
    };
    render() {
        const { dispatch } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const updateUserInfo = bindActionCreators(NavActionCreators.updateUserInfo, dispatch);
        const setLoggedIn = bindActionCreators(NavActionCreators.setLoggedIn, dispatch);
        const uploadImage = bindActionCreators(ImageUploadCreators.uploadImage, dispatch);
        const createImage = bindActionCreators(ImageUploadCreators.createImage, dispatch);
        const createArtwork = bindActionCreators(ImageUploadCreators.createArtwork, dispatch);
        const classifyImage = bindActionCreators(ImageUploadCreators.classifyImage, dispatch);
        const createTag = bindActionCreators(ImageUploadCreators.createTag, dispatch);
        const rejectTag = bindActionCreators(ImageUploadCreators.rejectTag, dispatch);
        const exploreBasedOnThisArtwork = bindActionCreators(ImageUploadCreators.exploreBasedOnThisArtwork, dispatch);
        const classificationToTags = bindActionCreators(ImageUploadCreators.classificationToTags, dispatch);
        const visualRecognition = bindActionCreators(ImageUploadCreators.visualRecognition, dispatch);
        const clickFooterItem = bindActionCreators(FooterActionCreators.clickFooterItem, dispatch);
        return (
            <div>
                <Container className={'main-content'}>
                    <Nav clickMenuItem={clickMenuItem} updateUserInfo={updateUserInfo} setLoggedIn={setLoggedIn}></Nav>
                    <ImageUploader uploadImage={uploadImage} createImage={createImage} createArtwork={createArtwork} classifyImage={classifyImage} createTag={createTag} rejectTag={rejectTag} exploreBasedOnThisArtwork={exploreBasedOnThisArtwork} classificationToTags={classificationToTags} visualRecognition={visualRecognition}/>
                </Container>
                <Footer clickFooterItem={clickFooterItem}></Footer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        home: state
    }
};

export default connect(mapStateToProps)(Home);