import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import { Segment, Container, Image } from 'semantic-ui-react';
import * as ArtworkActions from '../actions/artwork_actions'
import PathHelper from '../helpers/path-helper';


class Artwork extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.setUser = this.setUser.bind(this);
    }
    setUser(data){
        this.userId = data.id;
    }
    componentDidMount(){
        this.setUser(this.props.user['userInfo']);
        const data = {
            workId: this.state.workId,
            userId: this.userId
        };
        ajax.post( PathHelper.apiPath + '/works/display')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    const data ={
                        id: response.body.work.id,
                        image: {
                            colors: JSON.parse(response.body.image.colors),
                            format: response.body.image.format,
                            grayscale: response.body.image.grayscale,
                            height: response.body.image.height,
                            id: response.body.image.id,
                            url: response.body.image.url,
                            width: response.body.image.width
                        }
                    };
                    this.setState({work:data});
                } else {
                    console.log('Error', error);
                }
            });
    }
    render(){
        return(

            <Segment>
                {  this.state.work ?
                    <Container>
                    <Image src={this.state.work.image.url} width={this.state.work.image.width} height={this.state.work.image.height} />
                    </Container> : null
                }
            </Segment>
        )
    }
}

Artwork.propTypes = {
    browseBasedOnThis: PropTypes.func.isRequired,
    relatedToMe: PropTypes.func.isRequired,
    moreLikeThis: PropTypes.func.isRequired,
    userNameClicked: PropTypes.func.isRequired,
    workId: PropTypes.string.isRequired,
    userInfo: PropTypes.shape({
        id: PropTypes.string,
        username:PropTypes.string,
        firstName:PropTypes.string,
        lastName:PropTypes.string
    }),
    work: PropTypes.shape({
        id: PropTypes.string,
        image: PropTypes.shape({
            colors: PropTypes.any,
            format: PropTypes.string,
            grayscale: PropTypes.bool,
            height: PropTypes.number,
            id: PropTypes.string,
            url: PropTypes.string,
            width: PropTypes.number
        })
    })
};

const mapDispatchToProps = (dispatch) => {
    return {
        browseBasedOnThis: () => {
            dispatch(ArtworkActions.browseBasedOnThis())
        },
        relatedToMe: () => {
            dispatch(ArtworkActions.relatedToMe())
        },
        moreLikeThis: () => {
            dispatch(ArtworkActions.moreLikeThis())
        },
        userNameClicked: () => {
            dispatch(ArtworkActions.userNameClicked())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['Artwork'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Artwork);