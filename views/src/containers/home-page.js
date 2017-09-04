import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import * as WelcomeDialogActionCreators from '../actions/welcome-dialog_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import Wall from '../components/wall';
import MyFriends from '../components/my-friends';
import HomeControls from '../components/home-controls';
import HowItWorksPromo from '../components/how-it-works-promo';
import Splash from '../components/Splash';
import LatestImages from '../components/latest-images';
import OfferPromo from '../components/offer-promo';
import WelcomeDialog from '../components/welcome-dialog';
import { Container, Segment, Grid, Divider,Header } from 'semantic-ui-react';

class HomePage extends Component {
    static propTypes = {
        home: PropTypes.object.isRequired
    };
    render() {
        const { dispatch } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const updateUserInfo = bindActionCreators(NavActionCreators.updateUserInfo, dispatch);
        const setLoggedIn = bindActionCreators(NavActionCreators.setLoggedIn, dispatch);
        const signOut = bindActionCreators(NavActionCreators.signOut, dispatch);
        const clickFooterItem = bindActionCreators(FooterActionCreators.clickFooterItem, dispatch);
        const doTyping =  bindActionCreators(WelcomeDialogActionCreators.doTyping, dispatch);
        const postMessage =  bindActionCreators(WelcomeDialogActionCreators.postMessage, dispatch);
        const getAIResponse =  bindActionCreators(WelcomeDialogActionCreators.getAIResponse, dispatch);
        return (
            <div>
                <Container className={'main-content'}>
                    <Nav
                        signOut={signOut}
                        clickMenuItem={clickMenuItem}
                        updateUserInfo={updateUserInfo}
                        setLoggedIn={setLoggedIn}>
                    </Nav>
                    {! this.props.home['Nav'].isLoggedIn ?
                    <div>
                        <Splash/>
                        <Divider />
                        <HowItWorksPromo/>
                        <Divider />
                        <LatestImages/>
                        <OfferPromo/>
                    </div> :
                     <div>
                        <Container>
                            <WelcomeDialog
                                doTyping={doTyping}
                                postMessage={postMessage}
                                getAIResponse={getAIResponse}
                            />
                            <Grid>
                                <Grid.Row stretched>
                                    <Grid.Column width={4}>
                                        <Segment>
                                            <HomeControls/>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Segment>
                                            <Wall/>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Segment>
                                            <MyFriends/>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Container>
                    </div>
                    }
                    <Container/>
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
        home: state
    }
};

export default connect(mapStateToProps)(HomePage);