import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ExternalUserQuestsActions from '../actions/external-user-quests_actions';
import { Segment, Card, Header } from 'semantic-ui-react';
import Suggestion from './suggestion';
import ajax from 'superagent';
import PathHelper from '../helpers/path-helper';
import {toastr} from 'react-redux-toastr';


class ExternalUserQuests extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.loadSuggestions = this.loadSuggestions.bind(this);
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
    componentWillReceiveProps(nextProps){
        this.setState(nextProps.state);
    }
    componentDidMount() {
        this.setState({doRedirect: false});
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
                <Header content="Challenges I'm working on"/>
                <Card.Group itemsPerRow={4}>
                    {suggestionsOptions}
                </Card.Group>
            </Segment>
        )
    }
}

ExternalUserQuests.propTypes = {
    doRedirect: PropTypes.bool,
    selectedQuestId: PropTypes.string,
    suggestions: PropTypes.any,
    getSuggestions: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        viewQuest: (questId) => {
            dispatch(ExternalUserQuestsActions.viewQuest(questId))
        },
        joinQuest: (questId) => {
            dispatch(ExternalUserQuestsActions.joinQuest(questId))
        },
        getSuggestions: (data) => {
            dispatch(ExternalUserQuestsActions.getSuggestions(data))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['ExternalUserQuests']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExternalUserQuests);