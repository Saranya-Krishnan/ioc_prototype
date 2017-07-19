import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import { Container} from 'semantic-ui-react';
import * as QuestActions from '../actions/quest_actions'
import PathHelper from '../helpers/path-helper';

class Quest extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.setUser = this.setUser.bind(this);
    }
    setUser(data){
        this.userId = data.id;
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps.state);
    }
    componentDidMount() {
        this.setUser(this.props.user['userInfo']);
        const data = {
            questId: this.props.id
        };
        ajax.post( PathHelper.apiPath + '/quests/display')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    const responseData ={
                        quest: {
                            startDate: response.body.quest.startDate,
                            goalDate: response.body.quest.goalDate,
                            completed: response.body.quest.completed,
                            hidden: response.body.quest.hidden,
                            statement: response.body.quest.statement
                        },
                        suggestion: {
                            label: response.body.suggestion.startDate,
                            description: response.body.suggestion.description,
                            prompt: response.body.suggestion.prompt
                        },
                        user: {
                            id: response.body.user.id
                        }
                    };
                    this.setState({
                        startDate: responseData.quest.startDate,
                        goalDate: responseData.quest.goalDate,
                        completed: responseData.quest.completed,
                        hidden: responseData.quest.hidden,
                        statement: responseData.quest.statement,
                        label: responseData.suggestion.label,
                        description: responseData.suggestion.description,
                        prompt: responseData.suggestion.prompt
                    });
                } else {
                    this.setState({errorText: error, hasError: true});
                }
            });
    }

    render(){
        return(
            <Container>
                {this.props.promoMode ?
                    <Container>
                        Promo
                        {this.state.startDate}
                        {this.state.goalDate}
                        {this.state.completed}
                        {this.state.hidden}
                        {this.state.label}
                        {this.state.description}
                        {this.state.prompt}
                    </Container>
                    : <Container>
                        Full
                        {this.state.startDate}
                        {this.state.goalDate}
                        {this.state.completed}
                        {this.state.hidden}
                        {this.state.label}
                        {this.state.description}
                        {this.state.prompt}
                    </Container> }
            </Container>
        )
    }
}

Quest.propTypes = {
    id: PropTypes.string.isRequired,
    startDate: PropTypes.instanceOf(Date),
    goalDate: PropTypes.instanceOf(Date),
    completed: PropTypes.bool,
    hidden: PropTypes.bool,
    statement: PropTypes.string,
    promoMode: PropTypes.bool.isRequired,
    label: PropTypes.string,
    description: PropTypes.string,
    prompt: PropTypes.string,
    hasError: PropTypes.bool,
    errorText: PropTypes.string,
    userInfo: PropTypes.shape({
        id: PropTypes.string,
        username:PropTypes.string,
        firstName:PropTypes.string,
        lastName:PropTypes.string
    }),
};

const mapDispatchToProps = (dispatch) => {
    return {
        setGoalDate: () => {
            dispatch(QuestActions.setGoalDate())
        },
        addNote: () => {
            dispatch(QuestActions.addNote())
        },
        joinQuest: () => {
            dispatch(QuestActions.joinQuest())
        },
        adabdonQuest: () => {
            dispatch(QuestActions.adabdonQuest())
        },
        seeAllMyQuests: () => {
            dispatch(QuestActions.seeAllMyQuests())
        },
        goToQuestPage: () => {
            dispatch(QuestActions.goToQuestPage())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['Quest'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Quest);
