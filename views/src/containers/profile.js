import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import {Container, Segment } from 'semantic-ui-react';
import UserInfo from '../components/user-info';

class Profile extends Component {
    static propTypes = {
        profile: PropTypes.object.isRequired
    };
    render() {
        const { dispatch } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const clickFooterItem = bindActionCreators(FooterActionCreators.clickFooterItem, dispatch);
        const updateUserInfo = bindActionCreators(NavActionCreators.updateUserInfo, dispatch);
        const setLoggedIn = bindActionCreators(NavActionCreators.setLoggedIn, dispatch);
        const signOut = bindActionCreators(NavActionCreators.signOut, dispatch);
        return (
            <div>
                <Container className={'main-content'}>
                    <Nav
                        signOut={signOut}
                        clickMenuItem={clickMenuItem}
                        updateUserInfo={updateUserInfo}
                        setLoggedIn={setLoggedIn}>
                    </Nav>
                    <Segment>
                        <h1>Profile</h1>
                       <UserInfo/>
                        <div>My Notebooks</div>
                        <div>My "Quests"</div>
                        <div>My Suggestions</div>
                        <div>My Uploads</div>
                        <div>Feed</div>
                    </Segment>
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

export default connect(mapStateToProps)(Profile);

//MATCH (user)-[:UPLOADED]->(upload) WHERE user.id = 177 MATCH(u{id:upload.id}) RETURN user.id, u.url