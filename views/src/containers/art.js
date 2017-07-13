import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import * as ArtworkActionCreators from '../actions/artwork_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import {Container, Segment } from 'semantic-ui-react';
import Artwork from '../components/artwork';

class Art extends Component {
    static propTypes = {
        art: PropTypes.object.isRequired
    };
    render() {
        const { dispatch } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const updateUserInfo = bindActionCreators(NavActionCreators.updateUserInfo, dispatch);
        const setLoggedIn = bindActionCreators(NavActionCreators.setLoggedIn, dispatch);
        const signOut = bindActionCreators(NavActionCreators.signOut, dispatch);
        const loadArtwork = bindActionCreators(ArtworkActionCreators.loadArtwork, dispatch);
        const browseBasedOnThis = bindActionCreators(ArtworkActionCreators.browseBasedOnThis, dispatch);
        const relatedToMe = bindActionCreators(ArtworkActionCreators.relatedToMe, dispatch);
        const moreLikeThis = bindActionCreators(ArtworkActionCreators.moreLikeThis, dispatch);
        const userNameClicked = bindActionCreators(ArtworkActionCreators.userNameClicked, dispatch);
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
                    <Segment>
                        <h1>Art</h1>
                    </Segment>
                    <Artwork loadArtwork={loadArtwork} workId={this.props.match.params.id} browseBasedOnThis={browseBasedOnThis} relatedToMe={relatedToMe} moreLikeThis={moreLikeThis} userNameClicked={userNameClicked}></Artwork>
                </Container>
                <Footer clickFooterItem={clickFooterItem}></Footer>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        art: state
    }
);

export default connect(mapStateToProps)(Art);