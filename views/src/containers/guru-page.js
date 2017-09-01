import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import * as VideoBGActionCreators from '../actions/videoBG_actions';
import * as SuggestionsActionCreators from '../actions/suggestions_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import VideoBG from '../components/video-bg';
import Suggestions from '../components/suggestions';
import { Container, Image, Grid, Segment, Divider} from 'semantic-ui-react';
const instructorImage1 = require('!!url-loader!../../assets/img/instructor_1.jpg');


class GuruPage extends Component {
    static propTypes = {
        guru: PropTypes.object.isRequired
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
                    <Segment>
                    <Grid columns={2} divided={true}>
                        <Grid.Column>
                            <Image src={instructorImage1} fluid/>
                        </Grid.Column>
                        <Grid.Column>
                            <h1>Horus McCloud</h1>
                            <h4>Life Drawing Instructor</h4>
                            <p>Recent controversy aside, a glutted island without exhausts is truly a sleet of dauntless supplies. Some assert that wearish forecasts show us how catsups can be utensils. Recent controversy aside, authors often misinterpret the rule as a froward duckling, when in actuality it feels more like a blended factory. Some assert that the knavish brazil comes from a creedal tray.</p>
                        </Grid.Column>
                    </Grid>
                    </Segment>
                    <Divider/>
                    <VideoBG
                        clickVideo={clickVideo}
                    />
                    <Divider/>
                    <Suggestions
                        headlineText="Challenges from this instructor"
                        helpText="Horus has created a series of life drawing classes to help your sketching at any level"
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
        guru: state
    }
};

export default connect(mapStateToProps)(GuruPage);