import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import * as ExternalUserArtworksActionCreators from '../actions/external-user-artworks_actions';
import * as ExternalUserHeaderActionCreators from '../actions/external-user-header_actions';
import * as ExternalUserQuestsActionCreators from '../actions/external-user-quests_actions';
import Nav from '../components/nav';
import ExternalUserHeader from '../components/external-user-header';
import ExternalUserArtworks from '../components/external-user-artworks';
import ExternalUserQuests from '../components/external-user-quests';
import Footer from '../components/footer';
import {Container } from 'semantic-ui-react';

class ExternalProfilePage extends Component {
    static propTypes = {
        profile: PropTypes.object.isRequired
    };
    render() {
        const { dispatch } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const updateUserInfo = bindActionCreators(NavActionCreators.updateUserInfo, dispatch);
        const setLoggedIn = bindActionCreators(NavActionCreators.setLoggedIn, dispatch);
        const signOut = bindActionCreators(NavActionCreators.signOut, dispatch);
        const follow = bindActionCreators(ExternalUserHeaderActionCreators.follow, dispatch);
        const unfollow = bindActionCreators(ExternalUserHeaderActionCreators.unfollow, dispatch);
        const viewQuest = bindActionCreators(ExternalUserQuestsActionCreators.viewQuest, dispatch);
        const joinQuest = bindActionCreators(ExternalUserQuestsActionCreators.joinQuest, dispatch);
        const getSuggestions = bindActionCreators(ExternalUserQuestsActionCreators.getSuggestions, dispatch);
        const viewArtwork = bindActionCreators(ExternalUserArtworksActionCreators.viewArtwork, dispatch);
        const loadArtwork = bindActionCreators(ExternalUserArtworksActionCreators.loadArtwork, dispatch);
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
                    <Container>
                        <ExternalUserHeader
                            follow={follow}
                            unfollow={unfollow}
                        />
                        <ExternalUserArtworks
                            viewArtwork={viewArtwork}
                            loadArtwork={loadArtwork}
                        />
                        <ExternalUserQuests
                            viewQuest={viewQuest}
                            joinQuest={joinQuest}
                            getSuggestions={getSuggestions}
                        />
                    </Container>
                </Container>
                <Footer clickFooterItem={clickFooterItem}></Footer>
            </div>
        );
    }
}



const mapStateToProps = state => (
    {
        profile: state
    }
);

export default connect(mapStateToProps)(ExternalProfilePage);