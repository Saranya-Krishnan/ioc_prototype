import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Card } from 'semantic-ui-react';
import * as ArtworkCardActions from '../actions/artwork-card_actions';

class ArtworkCard extends Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.state);
    }
    render() {
        return (
            <Card
                href={'/artwork/' + this.props.id}
                image={this.props.image}
                header={this.props.title}
            />
        )
    }
}


ArtworkCard.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string,
    doRedirect: PropTypes.bool,
    goToArtworkPage: PropTypes.func,
    height: PropTypes.number,
    width: PropTypes.number
};

const mapDispatchToProps = (dispatch) => {
    return {
        goToArtworkPage: redirect => {
            dispatch(ArtworkCardActions.goToArtworkPage(redirect))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['ArtworkCard']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtworkCard);
