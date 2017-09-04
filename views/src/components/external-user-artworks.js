import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ExternalUserArtworksActions from '../actions/external-user-artworks_actions';
import { Segment, Header, Card } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import ArtworkCard from './artwork-card';
import ajax from 'superagent';
import PathHelper from '../helpers/path-helper';
import {toastr} from 'react-redux-toastr';


class ExternalUserArtworks extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.getMyArtwork = this.getMyArtwork.bind(this);
    }

    getMyArtwork(){
        if(!this.state.stopper){
            const data = {
                userId: this.userId
            };
            ajax.post( PathHelper.apiPath + '/works/get-all')
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
                        this.props.loadArtwork(true,worksOfArt);
                    } else {
                        toastr.error('Error retrieving your quests', error);
                    }
                });
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps.state);
    }
    componentDidMount() {
        this.setState({doRedirect: false});
        this.getMyArtwork();
    }
    render(){
        let ArtworkCardGroup = null;
        if(this.state.haveArtwork){
            const artwork = this.state.artworks;
            ArtworkCardGroup = artwork.map((a, index) => (
                <ArtworkCard id={a.id} title={'TK'} image={a.image} key={index}/>
            ));
        }
        return(
            <Segment>
                <Header content="My Artwork"/>
                <Card.Group>
                    {ArtworkCardGroup}
                </Card.Group>
            </Segment>
        )
    }
}

ExternalUserArtworks.propTypes = {
    artworks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string
    })),
    doRedirect: PropTypes.bool,
    haveArtwork:PropTypes.bool,
    stopper: PropTypes.bool,
    loadArtwork: PropTypes.func.isRequired

};

const mapDispatchToProps = (dispatch) => {
    return {
        viewArtwork: () => {
            dispatch(ExternalUserArtworksActions.viewArtwork())
        },
        loadArtwork: (having, artworks) => {
            dispatch(ExternalUserArtworksActions.loadArtwork(having, artworks))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['ExternalUserArtworks']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExternalUserArtworks);