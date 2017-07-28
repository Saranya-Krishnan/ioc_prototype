import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import { Header, Container} from 'semantic-ui-react';
import * as ArtworkInNotebookActions from '../actions/artwork-in-notebook_actions';
import PathHelper from '../helpers/path-helper';
import ArtworkCard from './artwork-card';

class ArtWorkInNoteBook extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.setUser = this.setUser.bind(this);
        this.getMyArtwork = this.getMyArtwork.bind(this);
    }
    getMyArtwork(){
        if(!this.state.stopper){
            const data = {
                notebookId: this.props.notebookId
            };
            ajax.post( PathHelper.apiPath + '/notebooks/artwork-in-notebook')
                .set('Content-Type', 'application/json')
                .send(data)
                .end((error, response) => {
                    if (!error && response) {
                        const worksOfArt =[];
                        for(let i=0;i<response.body.work.length;i++){
                            let aWork = {
                                id:response.body.work[i].id,
                                image:response.body.image[i].url,
                                height: response.body.image[i].height,
                                width: response.body.image[i].width
                            };
                            worksOfArt.push(aWork);
                        }
                        this.props.loadMyArtwork(true,worksOfArt);
                    } else {
                        console.log('error retrieving your quests', error);
                    }
                });
        }
    }
    setUser(data) {
        this.userId = data.id;
        this.getMyArtwork();
        this.setState({stopper: true});
    }
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.state);
        if(nextProps.user.userInfo.id !=='' && nextProps.user.userInfo.id !==undefined){
            this.setUser(nextProps.user.userInfo);
        }
    }
    render() {
        let ArtworkCardGroup = null;
        if(this.state.haveArtwork){
            const artwork = this.state.myArtwork;
            ArtworkCardGroup = artwork.map((a, index) => (
                <ArtworkCard id={a.id} title={'TK'} image={a.image} key={index}/>
            ));
        }
        return (
            <Container>
                <Header content="Artwork in this Notebook"/>
                {ArtworkCardGroup}
            </Container>
        )
    }
}

ArtWorkInNoteBook.propTypes = {
    myArtwork: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string
    })),
    haveArtwork:PropTypes.bool,
    stopper: PropTypes.bool,
    loadMyArtwork: PropTypes.func.isRequired,
    notebookId: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadMyArtwork: (having, artwork) => {
            dispatch(ArtworkInNotebookActions.loadMyArtwork(having, artwork))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['ArtworkInNotebook'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtWorkInNoteBook);