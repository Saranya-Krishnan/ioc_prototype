import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Card } from 'semantic-ui-react';
import * as SuggestionsActions from '../actions/suggestions_actions'
import ajax from 'superagent';
import PathHelper from '../helpers/path-helper';
import {toastr} from 'react-redux-toastr';
import Suggestion from './suggestion';


class Suggestions extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.loadSuggestions = this.loadSuggestions.bind(this);
        this.setUser = this.setUser.bind(this);
    }
    loadSuggestions(){
        ajax.get(PathHelper.apiPath + '/suggestions/get-all-suggestions')
            .set('Content-Type', 'application/json')
            .end((error, response) => {
                if (!error && response) {
                    this.props.getSuggestions(response.body);
                } else {
                    toastr.error('Error getting suggestions', error);
                }
            });

    }
    setUser(data){
        this.userId = data.id;
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps.state);
    }
    componentDidMount(){
        this.setUser(this.props.user['userInfo']);
        this.loadSuggestions();
    }
    render(){
        let suggestionsOptions = null;
        if(this.state.suggestions){
            if(this.state.suggestions.length) {
                const s = this.state.suggestions;
                suggestionsOptions = s.map((suggestion, index) => (
                    <Suggestion
                        id={suggestion.id}
                        prompt={suggestion.prompt}
                        key={suggestion.id}
                        meaningId={suggestion.meaningId}
                    />
                ));
            }
        }
        return(
            <Segment>
                <h2>{this.props.headlineText}</h2>
                <p>{this.props.helpText}</p>
                <Card.Group itemsPerRow={4}>
                    {suggestionsOptions}
                </Card.Group>
            </Segment>
        )
    }
}

Suggestions.propTypes = {
    headlineText: PropTypes.string.isRequired,
    helpText: PropTypes.string,
    suggestions: PropTypes.any,
    getSuggestions: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSuggestions: (data) => {
            dispatch(SuggestionsActions.getSuggestions(data))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['Suggestions'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);