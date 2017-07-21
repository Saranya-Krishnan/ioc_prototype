import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import * as ImageUploadCreators from '../actions/image-uploader_actions';
import * as MyNotebookCreators from '../actions/my-notebooks_actions';
import * as NotebookCreators from '../actions/notebook_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import ImageUploader from '../components/image-uploader';
import MyNotebooks from '../components/my-notebooks';
import Notebook from '../components/notebook';
import { Container, Segment, Grid } from 'semantic-ui-react';


class UploadPage extends Component {
    static propTypes = {
        upload: PropTypes.object.isRequired
    };
    render() {
        const { dispatch } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const updateUserInfo = bindActionCreators(NavActionCreators.updateUserInfo, dispatch);
        const setLoggedIn = bindActionCreators(NavActionCreators.setLoggedIn, dispatch);
        const signOut = bindActionCreators(NavActionCreators.signOut, dispatch);
        const getMyNotebooks = bindActionCreators(MyNotebookCreators.getMyNotebooks, dispatch);
        const getPagesFromCurrentNotebook = bindActionCreators(MyNotebookCreators.getPagesFromCurrentNotebook, dispatch);
        const setCurrentNotebook = bindActionCreators(MyNotebookCreators.setCurrentNotebook, dispatch);
        const createNewNotebook = bindActionCreators(NotebookCreators.createNewNotebook, dispatch);

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
                    { this.props.upload['MyNotebooks'].noteBooksFound > 0 ?
                        <Segment>
                            <Grid divided>
                                <Grid.Column width={10}>
                                <MyNotebooks
                                    getMyNotebooks={getMyNotebooks}
                                    getPagesFromCurrentNotebook={getPagesFromCurrentNotebook}
                                    setCurrentNotebook={setCurrentNotebook}
                                />
                                </Grid.Column>
                                <Grid.Column width={6}>
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
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    :   <Segment >
                        <Notebook
                            isNewNotebook={true}/>
                        </Segment>
                    }
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
        upload: state
    }
};

export default connect(mapStateToProps)(UploadPage);