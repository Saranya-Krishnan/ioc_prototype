import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import { Header, Segment, Card} from 'semantic-ui-react';
import * as MyArtworkActions from '../actions/my-artwork_actions';
import PathHelper from '../helpers/path-helper';
import ArtworkCard from './artwork-card';
import {toastr} from 'react-redux-toastr';

class MyArtwork extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.setUser = this.setUser.bind(this);
        this.getMyArtwork = this.getMyArtwork.bind(this);
    }
    getMyArtwork(){
        if(!this.state.stopper){
            const data = {
                userId: this.userId
            };
            ajax.post( PathHelper.apiPath + '/works/my-work')
                .set('Content-Type', 'application/json')
                .send(data)
                .end((error, response) => {
                    if (!error && response) {
                        const worksOfArt =[];
                        for(let i=0;i<response.body.work.length;i++){
                            let aWork = {
                                id:response.body.work[i].id,
                                title:response.body.work[i].title,
                                description:response.body.work[i].description,
                                image:response.body.image[i].url,
                                height: response.body.image[i].height,
                                width: response.body.image[i].width
                            };
                            worksOfArt.push(aWork);
                        }
                        this.props.loadMyArtwork(true,worksOfArt);
                    } else {
                        toastr.error('Error retrieving your quests', error);
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
                <ArtworkCard id={a.id} title={a.title} image={a.image} key={index}/>
            ));
        }
        return (
            <Segment>
                <Header content="My Artwork"/>
                <Card.Group>
                    {ArtworkCardGroup}
                </Card.Group>
            </Segment>
        )
    }
}

MyArtwork.propTypes = {
    myArtwork: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string
    })),
    haveArtwork:PropTypes.bool,
    stopper: PropTypes.bool,
    loadMyArtwork: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadMyArtwork: (having, artwork) => {
            dispatch(MyArtworkActions.loadMyArtwork(having, artwork))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['MyArtwork'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyArtwork);