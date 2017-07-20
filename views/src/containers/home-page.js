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

class HomePage extends Component {
    static propTypes = {
        home: PropTypes.object.isRequired
    };
    render() {
        const { dispatch } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const updateUserInfo = bindActionCreators(NavActionCreators.updateUserInfo, dispatch);
        const setLoggedIn = bindActionCreators(NavActionCreators.setLoggedIn, dispatch);
        const signOut = bindActionCreators(NavActionCreators.signOut, dispatch);
        const uploadImage = bindActionCreators(ImageUploadCreators.uploadImage, dispatch);
        const createImage = bindActionCreators(ImageUploadCreators.createImage, dispatch);
        const createArtwork = bindActionCreators(ImageUploadCreators.createArtwork, dispatch);
        const classifyImage = bindActionCreators(ImageUploadCreators.classifyImage, dispatch);
        const createTag = bindActionCreators(ImageUploadCreators.createTag, dispatch);
        const getNewTagOntology = bindActionCreators(ImageUploadCreators.getNewTagOntology, dispatch);
        const enrichNewTag = bindActionCreators(ImageUploadCreators.enrichNewTag, dispatch);
        const makeMeaning = bindActionCreators(ImageUploadCreators.makeMeaning, dispatch);
        const exploreBasedOnThisArtwork = bindActionCreators(ImageUploadCreators.exploreBasedOnThisArtwork, dispatch);
        const classificationToTags = bindActionCreators(ImageUploadCreators.classificationToTags, dispatch);
        const visualRecognition = bindActionCreators(ImageUploadCreators.visualRecognition, dispatch);
        const clickFooterItem = bindActionCreators(FooterActionCreators.clickFooterItem, dispatch);
        return (
            <div>
                <Container className={'main-content'}>
                    <Nav
                        signOut={signOut}
                        clickMenuItem={clickMenuItem}
                        updateUserInfo={updateUserInfo}
                        setLoggedIn={setLoggedIn}>
                    </Nav>
                    <div>select notebook</div>
                    <ImageUploader
                        makeMeaning={makeMeaning}
                        uploadImage={uploadImage}
                        getNewTagOntology={getNewTagOntology}
                        enrichNewTag={enrichNewTag}
                        createImage={createImage}
                        createArtwork={createArtwork}
                        classifyImage={classifyImage}
                        createTag={createTag}
                        exploreBasedOnThisArtwork={exploreBasedOnThisArtwork}
                        classificationToTags={classificationToTags}
                        visualRecognition={visualRecognition}/>
                </Container>
                <Footer
                    clickFooterItem={clickFooterItem}>
                </Footer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        home: state
    }
};

export default connect(mapStateToProps)(HomePage);