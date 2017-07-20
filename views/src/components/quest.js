import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import { Container, Segment, Header, Divider, Button, Card, Statistic} from 'semantic-ui-react';
import * as QuestActions from '../actions/quest_actions'
import PathHelper from '../helpers/path-helper';
import moment from 'moment';
import { Redirect } from 'react-router';

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
        if(!this.props.promoMode){
            this.state.goToQuestPage(false);
        }
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
                            prompt: response.body.suggestion.prompt
                        },
                        user: {
                            id: response.body.user.id
                        },
                        meaning: {
                            label: response.body.meaning.label,
                            description: response.body.meaning.description,
                            schemaName: response.body.meaning.schemaName
                        }
                    };
                    this.setState({
                        startDate: responseData.quest.startDate,
                        goalDate: responseData.quest.goalDate,
                        completed: responseData.quest.completed,
                        hidden: responseData.quest.hidden,
                        statement: responseData.quest.statement,
                        label: responseData.meaning.label,
                        description: responseData.meaning.description,
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
                    <Container onClick={ () => this.state.goToQuestPage(true)}>
                        {this.state.doRedirect ? <Redirect push to={"/quest/"+this.props.id}/> : null}
                        <Card>
                            <Card.Content header={this.state.prompt}/>
                            <Card.Content description={this.state.description}/>
                            <Card.Content extra>
                                <Statistic>
                                    <Statistic.Label>Goal Date</Statistic.Label>
                                    <Statistic.Value>{moment(this.state.goalDate).toNow()}</Statistic.Value>
                                </Statistic>
                            </Card.Content>
                        </Card>
                    </Container>
                    : <Container>
                        <Segment>
                            <Header content={this.state.prompt} subheader={"You started this quest on " + moment(this.state.startDate).format("dddd, MMMM Do YYYY, h:mm:ss a")}/>
                            <Divider/>
                            <h3>About {this.state.label}</h3>
                            <p>{this.state.description}</p>
                            { this.state.completed ?
                                <Container>
                                    <h3>Completion Date</h3>
                                    <p>TK</p>
                                </Container> :
                                <Container>
                                    <Statistic>
                                        <Statistic.Label>Goal Date</Statistic.Label>
                                        <Statistic.Value>{moment(this.state.goalDate).toNow()}</Statistic.Value>
                                    </Statistic>
                                </Container> }
                            <Container>
                                <Button>Abandon</Button>
                                <Button>Upload & Complete</Button>
                            </Container>
                        </Segment>
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
    doRedirect: PropTypes.bool
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
        goToQuestPage: redirect => {
            dispatch(QuestActions.goToQuestPage(redirect))
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
