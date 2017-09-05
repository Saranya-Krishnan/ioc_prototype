import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import * as SuggestionsActionCreators from '../actions/suggestions_actions';
import * as VideoBGActionCreators from '../actions/videoBG_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import VideoBG from '../components/video-bg';
import Suggestions from '../components/suggestions';
import { Container} from 'semantic-ui-react';


class ExplorePage extends Component {
    static propTypes = {
        explore: PropTypes.object.isRequired
    };
    render() {
        const { dispatch } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const updateUserInfo = bindActionCreators(NavActionCreators.updateUserInfo, dispatch);
        const setLoggedIn = bindActionCreators(NavActionCreators.setLoggedIn, dispatch);
        const signOut = bindActionCreators(NavActionCreators.signOut, dispatch);
        const clickVideo  = bindActionCreators(VideoBGActionCreators.clickVideo, dispatch);
        const getSuggestions  = bindActionCreators(SuggestionsActionCreators.getSuggestions, dispatch);
        const clickFooterItem = bindActionCreators(FooterActionCreators.clickFooterItem, dispatch);
        return (
            <div>
                <Nav
                    signOut={signOut}
                    clickMenuItem={clickMenuItem}
                    updateUserInfo={updateUserInfo}
                    setLoggedIn={setLoggedIn}>
                </Nav>
                <Container>
                    <VideoBG
                        clickVideo={clickVideo}
                    />
                    <Suggestions
                        headlineText="Browse through challenges created by the Moleskine Community's art work."
                        helpText="You can set your own time table and conditions for completing a challenge."
                        getSuggestions={getSuggestions}
                    />
                </Container>
                <Footer
                    clickFooterItem={clickFooterItem}>
                </Footer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        explore: state
    }
};

export default connect(mapStateToProps)(ExplorePage);