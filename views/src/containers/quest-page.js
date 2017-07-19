import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import * as QuestActionCreators from '../actions/quest_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import {Container } from 'semantic-ui-react';
import Quest from '../components/quest';

class QuestPage extends Component {
    static propTypes = {
        questPage: PropTypes.object.isRequired
    };
    render() {
        const { dispatch } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const updateUserInfo = bindActionCreators(NavActionCreators.updateUserInfo, dispatch);
        const setLoggedIn = bindActionCreators(NavActionCreators.setLoggedIn, dispatch);
        const signOut = bindActionCreators(NavActionCreators.signOut, dispatch);
        const setGoalDate = bindActionCreators(QuestActionCreators.setGoalDate, dispatch);
        const addNote = bindActionCreators(QuestActionCreators.addNote, dispatch);
        const joinQuest = bindActionCreators(QuestActionCreators.joinQuest, dispatch);
        const adabdonQuest = bindActionCreators(QuestActionCreators.adabdonQuest, dispatch);
        const seeAllMyQuests = bindActionCreators(QuestActionCreators.seeAllMyQuests, dispatch);
        const goToQuestPage = bindActionCreators(QuestActionCreators.goToQuestPage, dispatch);
        const clickFooterItem = bindActionCreators(FooterActionCreators.clickFooterItem, dispatch);
        return (
            <div>
                <Container className={'main-content'}>
                    <Nav
                        signOut={signOut}
                        clickMenuItem={clickMenuItem}
                        updateUserInfo={updateUserInfo}
                        setLoggedIn={setLoggedIn}>
                    </Nav>
                    <Quest
                        id={this.props.match.params.id}
                        promoMode={false}
                        setGoalDate={setGoalDate}
                        addNote={addNote}
                        joinQuest={joinQuest}
                        adabdonQuest={adabdonQuest}
                        seeAllMyQuests={seeAllMyQuests}
                        goToQuestPage={goToQuestPage}>
                    </Quest>
                </Container>
                <Footer clickFooterItem={clickFooterItem}></Footer>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        questPage: state
    }
);

export default connect(mapStateToProps)(QuestPage);