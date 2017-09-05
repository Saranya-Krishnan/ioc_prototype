import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Card, Image } from 'semantic-ui-react';
import * as ArtworkCardActions from '../actions/artwork-card_actions';
import { Redirect } from 'react-router';

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
            <Card onClick={() => this.state.goToArtworkPage(true)} className="artwork-card">
                {this.state.doRedirect ? <Redirect push to={"/artwork/" + this.props.id}/> : null}
                <Image src={this.props.image}/>
                <Card.Content>
                    <Card.Header>
                        {this.props.id}
                    </Card.Header>
                </Card.Content>
            </Card>
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
