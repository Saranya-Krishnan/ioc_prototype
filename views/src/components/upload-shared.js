import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import ajax from 'superagent';
import { Segment, Sidebar, Header, Container, Button, Image} from 'semantic-ui-react';
import * as ImageUploadCreators from '../actions/image-uploader_actions';
import * as MyNotebookCreators from '../actions/my-notebooks_actions';
import * as NotebookCreators from '../actions/notebook_actions';
import * as UploadSharedCreators from '../actions/upload-shared_actions';
import {toastr} from 'react-redux-toastr';
import ImageUploader from '../components/image-uploader';
import MyNotebooks from '../components/my-notebooks';
import Notebook from '../components/notebook';
import PathHelper from '../helpers/path-helper';

class UploadShared extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.getNotebooks = this.getNotebooks.bind(this);
        this.openCaptureUI = this.openCaptureUI.bind(this);
        this.setUser = this.setUser.bind(this);
        this.stopper = false;
    }
    setUser(data){
        this.userId = data.id;
        this.getNotebooks();
        this.stopper = true;
    }
    openCaptureUI(state){
        this.setState({uploadUIVisible: state});
    }
    getNotebooks(){
        const data = {
            userId: this.userId
        };
        ajax.post( PathHelper.apiPath + '/notebooks/mine')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    const res = response.body;
                    const check = Number(res.noteBooksFound);
                    if(check===0){
                        this.props.accountForNoNotebooks(true);
                    }else{
                        this.props.accountForNoNotebooks(false);
                        this.setState({sharedNotebooks:res.notebooks});
                    }
                } else {
                    toastr.error('Error retrieving your quests', error);
                }
            });
    }
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.state);
        if(nextProps.user.userInfo.id !=='' && nextProps.user.userInfo.id !==undefined){
            if(!this.stopper){
                this.setUser(this.props.user['userInfo']);
            }
        }
    }
    render() {
        const { dispatch } = this.props;
        const displayMyNotebooks = bindActionCreators(MyNotebookCreators.displayMyNotebooks, dispatch);
        const createNewNotebook = bindActionCreators(NotebookCreators.createNewNotebook, dispatch);
        const uploadImage = bindActionCreators(ImageUploadCreators.uploadImage, dispatch);
        const createImage = bindActionCreators(ImageUploadCreators.createImage, dispatch);
        const createArtwork = bindActionCreators(ImageUploadCreators.createArtwork, dispatch);
        const classifyImage = bindActionCreators(ImageUploadCreators.classifyImage, dispatch);
        const createTag = bindActionCreators(ImageUploadCreators.createTag, dispatch);
        const getNewTagOntology = bindActionCreators(ImageUploadCreators.getNewTagOntology, dispatch);
        const enrichNewTag = bindActionCreators(ImageUploadCreators.enrichNewTag, dispatch);
        const makeMeaning = bindActionCreators(ImageUploadCreators.makeMeaning, dispatch);
        const makeSuggestions = bindActionCreators(ImageUploadCreators.makeSuggestions, dispatch);
        const exploreBasedOnThisArtwork = bindActionCreators(ImageUploadCreators.exploreBasedOnThisArtwork, dispatch);
        const classificationToTags = bindActionCreators(ImageUploadCreators.classificationToTags, dispatch);
        const visualRecognition = bindActionCreators(ImageUploadCreators.visualRecognition, dispatch);
        return (
            <Segment>
                { this.state.noNotebooks ? null :
                    <Sidebar.Pushable as={Container}>
                        <Sidebar
                            as={Segment}
                            animation='push'
                            width='wide'
                            direction='right'
                            visible={!this.state.uploadUIVisible}
                            icon='labeled'
                            vertical
                            inverted>
                                <ImageUploader
                                    makeSuggestions={makeSuggestions}
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
                        </Sidebar>
                    <Sidebar.Pusher>
                        {this.state.uploadUIVisible ?
                            <Button floated={'right'} onClick={() => this.openCaptureUI(false)} className="ui-toggle">Capture</Button>
                            :
                            <Button floated={'right'} onClick={() => this.openCaptureUI(true)} className="ui-toggle">Close</Button>
                        }
                    <Header content="My notebooks"/>
                    <p className="add-notebook-instructions">Click to select the notebook your upload comes from.</p>
                    <MyNotebooks
                        myNoteBooks={this.state.sharedNotebooks}
                        displayMyNotebooks={displayMyNotebooks}
                    />
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
                }
                {this.state.noNotebooks ?
                    <Notebook
                        isNewNotebook={true}
                        createNewNotebook={createNewNotebook}
                        doRedirect={false}/> : null}
            </Segment>
        )
    }
}

UploadShared.propTypes = {
    sharedNotebooks: PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.string,
    })),
    noNotebooks:PropTypes.bool,
    uploadUIVisible:PropTypes.bool

};

const mapDispatchToProps = (dispatch) => {
    return {
        accountForNoNotebooks: (none) => {
            dispatch(UploadSharedCreators.accountForNoNotebooks(none))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['UploadShared'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadShared);