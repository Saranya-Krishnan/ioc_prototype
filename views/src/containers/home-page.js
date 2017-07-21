import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import { Container, Segment, Grid, Divider } from 'semantic-ui-react';

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
        return (
            <div>
                <Container className={'main-content'}>
                    <Nav
                        signOut={signOut}
                        clickMenuItem={clickMenuItem}
                        updateUserInfo={updateUserInfo}
                        setLoggedIn={setLoggedIn}>
                    </Nav>

                    {/*Not logged in promo mode*/}
                    {! this.props.home['Nav'].isLoggedIn ?
                    <div>
                        <Segment>Key visual</Segment>
                        <Divider />

                        {/*Component*/}

                        <Grid divided>
                            <Grid.Column width={4}>
                                <Segment>Intro Copy</Segment>
                            </Grid.Column>
                            <Grid.Column width={8}>
                               <Segment>Featured</Segment>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Segment>CTA</Segment>
                            </Grid.Column>
                        </Grid>
                        <Divider />


                        {/*Component*/}


                        <Grid>
                            <Grid.Column width={4}>
                                <Segment>Latest Img</Segment>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Segment>Latest Img</Segment>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Segment>Latest Img</Segment>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Segment>Latest Img</Segment>
                            </Grid.Column>
                        </Grid>


                        {/*Component*/}


                        <Segment>Large Offer</Segment>
                        <Grid>
                            <Grid.Column width={2}>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Segment>How it works</Segment>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Segment>How it works</Segment>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Segment>How it works</Segment>
                            </Grid.Column>
                            <Grid.Column width={2}>
                            </Grid.Column>
                        </Grid>
                        <Divider />

                        {/*Component*/}
                    </div> :
                     <div>
                        <Container>
                            <Grid divided>
                                <Grid.Column width={3}>

                                    {/*Component*/}
                                    <Segment>Controls/Notebooks</Segment>
                                    {/*Component*/}

                                </Grid.Column>
                                <Grid.Column width={10}>

                                    {/*Component*/}
                                    <Segment>Wall</Segment>
                                    {/*Component*/}

                                </Grid.Column>
                                <Grid.Column width={3}>
                                    {/*Component*/}
                                    <Segment>Social</Segment>
                                    {/*Component*/}

                                </Grid.Column>
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