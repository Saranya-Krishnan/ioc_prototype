import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Image, Button, Modal, Header } from 'semantic-ui-react'
import {FontAwesome} from 'react-fontawesome';
import * as SuggestionActions from '../actions/suggestion_actions'
import PathHelper from '../helpers/path-helper';
import ajax from 'superagent';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class Suggestion extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.getMeaning = this.getMeaning.bind(this);
        this.handleDatePicker = this.handleDatePicker.bind(this);
        this.acceptSuggestion = this.acceptSuggestion.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }
    handleOpen(){
        this.setState({modalOpen:true});
    }
    setUser(data){
        this.userId = data.id;
    }
    handleDatePicker(date){
        this.setState({startDate: date});
    }
    acceptSuggestion(){
        this.setUser(this.props.user['userInfo']);
        this.setState({modalOpen:false});
        const data = {
            suggestionId: this.props.id,
            userId: this.userId,
            startDate: moment(),
            goalDate: this.state.startDate,
            completed: false,
            hidden: false,
            statement: ''
        };
        ajax.post(PathHelper.apiPath + '/quests/create')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                    if (!error && response) {
                        console.log('ok');
                    }else{
                        console.log('Error accepting suggestion', error);
                    }
                }
            );
    }
    getMeaning(){
        //ToDo: Work with passed Meaning if available then call
        const data = {
            meaningId: this.props.meaningId
        };
        ajax.post(PathHelper.apiPath + '/meanings/retrieve')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                    if (!error && response) {
                        this.props.showQuest(response.body);
                    }else{
                        console.log('Error getting meaning', error);
                    }
                }
            );
    }
    componentWillReceiveProps(nextProps){
        this.setState(nextProps.state);
    }
    componentWillMount(){
        this.setState({startDate: moment()});
    }
    //ToDo: Respond to missing/present image for quest
    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        {this.props.prompt}
                    </Card.Header>
                    <Card.Meta>
                        Drawing Challenge
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Modal trigger={<Button basic color='green' onClick={() => this.handleOpen}>Accept</Button>} onOpen={()=>this.getMeaning} closeIcon={true}  open={this.state.modalOpen}>
                        <Modal.Header>Accept this suggestion</Modal.Header>
                        <Modal.Content image>
                            <Image wrapped size='medium' src='' />
                            <Modal.Description>
                                <Header>{this.props.prompt}</Header>
                                { this.state.meaning ?
                                    <h3>{this.state.meaning.label}</h3>  : null }
                                { this.state.meaning ?
                                    <p>{this.state.meaning.description}</p>  : null }
                                <div className="bottom-holder">
                                    <div className="ui form">
                                        <div className="field">
                                            <label>Set a completion goal date:</label>
                                            <DatePicker
                                                selected={this.state.startDate}
                                                onChange={this.handleDatePicker}
                                            />
                                        </div>
                                    </div>
                                    <Button color="green" onClick={this.acceptSuggestion}>Accept Suggestion</Button>
                                </div>
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                </Card.Content>
            </Card>
        )
    }
}

Suggestion.propTypes = {
    prompt: PropTypes.string,
    isHidden: PropTypes.bool,
    isTaken: PropTypes.bool,
    takeSuggestion: PropTypes.func,
    undoTakeSuggestion: PropTypes.func,
    showSuggestion: PropTypes.func,
    moreSuggestionsLikeThis: PropTypes.func,
    hideSuggestion: PropTypes.func,
    showQuest: PropTypes.func,
    startDate: PropTypes.instanceOf(Date),
    meaning: PropTypes.shape({
        id: PropTypes.string,
        description: PropTypes.string,
        label: PropTypes.string,
        schemaName: PropTypes.string,
        lastUpdate: PropTypes.any
    })
};

const mapDispatchToProps = (dispatch) => {
    return {
        showQuest: (meaning) => {
            dispatch(SuggestionActions.showQuest(meaning))
        },
        takeSuggestion: () => {
            dispatch(SuggestionActions.takeSuggestion())
        },
        undoTakeSuggestion: () => {
            dispatch(SuggestionActions.undoTakeSuggestion())
        },
        moreSuggestionsLikeThis: () => {
            dispatch(SuggestionActions.moreSuggestionsLikeThis())
        },
        showSuggestion: () => {
            dispatch(SuggestionActions.showSuggestion())
        },
        hideSuggestion: () => {
            dispatch(SuggestionActions.hideSuggestion())
        }
    }
};

const mapStateToProps = (state) => {
    return {
        artwork: state['Artwork'],
        state:state['Suggestion'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggestion);