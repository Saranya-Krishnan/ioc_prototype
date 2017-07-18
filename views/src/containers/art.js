import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import * as ArtworkActionCreators from '../actions/artwork_actions';
import * as SuggestionsActionCreators from '../actions/suggestions_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import {Container } from 'semantic-ui-react';
import Artwork from '../components/artwork';
import Suggestions from '../components/suggestions';
import PathHelper from '../helpers/path-helper';
import ajax from 'superagent';


class Art extends Component {
    componentDidMount(){
        const data = {
        };
        ajax.post( PathHelper.apiPath + '/suggestions/batch-create-from-meanings')
            .set('Content-Type', 'application/json')
            .send(data)
            .end((error, response) => {
                if (!error && response) {
                    console.log('Suggestions temp',response.body);
                } else {
                    console.log('Batch create error', error);
                }
            });
    }
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
        const getSuggestions = bindActionCreators(ArtworkActionCreators.getSuggestions, dispatch);
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
                    <Artwork loadArtwork={loadArtwork}
                             getSuggestions={getSuggestions}
                             workId={this.props.match.params.id}
                             browseBasedOnThis={browseBasedOnThis}
                             relatedToMe={relatedToMe}
                             moreLikeThis={moreLikeThis}
                             userNameClicked={userNameClicked}>
                    </Artwork>
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