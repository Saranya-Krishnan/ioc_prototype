import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import * as SuggestionsActions from '../actions/suggestions_actions'
import Suggestion from './suggestion';

class Suggestions extends Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps.state);
    }
    render(){
        return(
            <Segment>
                <h2>Suggestions found for this work:</h2>
                <p>Accept a suggestion to try new things, improve your drawing and writing and accelerate your creativity.</p>
            </Segment>
        )
    }
}

Suggestions.propTypes = {
    hideMeaningGroup: PropTypes.func,
    showMeaningGroup: PropTypes.func,
    displayMatchingQuest: PropTypes.func,
    dismissMatchingQuest: PropTypes.func,
    confirmMatchingQuest: PropTypes.func,
    questOpen: PropTypes.string,
    meaningGroups: PropTypes.arrayOf(PropTypes.shape({

    }))
};

const mapDispatchToProps = (dispatch) => {
    return {
        hideMeaningGroup: () => {
            dispatch(SuggestionsActions.hideMeaningGroup())
        },
        showMeaningGroup: () => {
            dispatch(SuggestionsActions.showMeaningGroup())
        },
        displayMatchingQuest: () => {
            dispatch(SuggestionsActions.displayMatchingQuest())
        },
        dismissMatchingQuest: () => {
            dispatch(SuggestionsActions.dismissMatchingQuest())
        },
        confirmMatchingQuest: () => {
            dispatch(SuggestionsActions.confirmMatchingQuest())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['Suggestions']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);