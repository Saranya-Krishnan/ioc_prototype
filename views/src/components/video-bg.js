import React, { Component } from 'react';
import {ReactDOM} from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as VideoBGActionCreators from '../actions/videoBG_actions';
import { Container } from 'semantic-ui-react'
const SampleVideo = require('!!url-loader!../../assets/motion/niles-heckman-woman-writing-in-journal-77383-filmsupply.mov');


class VideoBG extends Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    render() {
        return (
            <Container className="video-large">
                <video autoPlay loop id="video-background" muted playsInline>
                    <source src={SampleVideo} type="video/mp4"/>
                </video>
                <strong className="poc-text">This is placeholder.</strong>
            </Container>
        )
    }
}
VideoBG.propTypes = {
    videoSRC: PropTypes.string,
    clickVideo: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        clickVideo: () => {
            dispatch(VideoBGActionCreators.clickVideo())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['VideoBG'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoBG);