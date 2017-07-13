import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import * as SignInActionCreators from '../actions/sign-in_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import SignIn from '../components/sign-in-form';
import {Container } from 'semantic-ui-react';

class SignInPage extends Component {
    static propTypes = {
        signIn: PropTypes.object.isRequired
    };
    render() {
        const { dispatch } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const clickFooterItem = bindActionCreators(FooterActionCreators.clickFooterItem, dispatch);
        const onClickSubmit = bindActionCreators(SignInActionCreators.onClickSubmit, dispatch);
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
                    <SignIn onClickSubmit={onClickSubmit}/>
                </Container>
                <Footer clickFooterItem={clickFooterItem}></Footer>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        signIn: state
    }
);

export default connect(mapStateToProps)(SignInPage);