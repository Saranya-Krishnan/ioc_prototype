import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ajax from 'superagent';
import { Header, Segment, Card} from 'semantic-ui-react';
import * as QuestsActions from '../actions/quests_actions'
import PathHelper from '../helpers/path-helper';
import Quest from './quest';

class Quests extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.setUser = this.setUser.bind(this);
        this.getMyQuests = this.getMyQuests.bind(this);
    }

    getMyQuests(){
        if(!this.state.stopper){
            const data = {
                userId: this.userId
            };
            ajax.post( PathHelper.apiPath + '/quests/my-quests')
                .set('Content-Type', 'application/json')
                .send(data)
                .end((error, response) => {
                    if (!error && response) {
                        const res = response.body;
                        const questIds = [];
                        for(let i=0; i<res.length; i++){
                            questIds.push(res[i].id);
                        }
                        this.props.loadMyQuests(true,questIds);
                    } else {
                        console.log('error retrieving your quests', error);
                    }
                });
        }
    }
    setUser(data) {
        this.userId = data.id;
        this.getMyQuests();
        this.setState({stopper: true});
    }
    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.state);
        if(nextProps.user.userInfo.id !=='' && nextProps.user.userInfo.id !==undefined){
            this.setUser(nextProps.user.userInfo);
        }
    }
    render() {
        let questGroup = null;
        if(this.state.haveQuests){
            const quests = this.state.myQuestIds;
            questGroup = quests.map((q, index) => (
                <Quest promoMode={true} id={q} key={index}/>
            ));
        }
        return (
            <Segment className="quests-container">
                <Header content="My quests" className="quests-header"/>
                <Card.Group>
                    {questGroup}
                </Card.Group>
            </Segment>
        )
    }
}

Quests.propTypes = {
    myQuestIds: PropTypes.arrayOf(PropTypes.string),
    haveQuests:PropTypes.bool,
    stopper: PropTypes.bool,
    loadMyQuests: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadMyQuests: (having, quests) => {
            dispatch(QuestsActions.loadMyQuests(having, quests))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['Quests'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Quests);