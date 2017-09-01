import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import * as VideoBGActionCreators from '../actions/videoBG_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import { Container, Divider, Grid } from 'semantic-ui-react';
import VideoBG from '../components/video-bg';
import HowItWorksPromo from '../components/how-it-works-promo';

class FeaturesPage extends Component {
    static propTypes = {
        features: PropTypes.object.isRequired
    };
    render() {
        const { dispatch } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const updateUserInfo = bindActionCreators(NavActionCreators.updateUserInfo, dispatch);
        const setLoggedIn = bindActionCreators(NavActionCreators.setLoggedIn, dispatch);
        const signOut = bindActionCreators(NavActionCreators.signOut, dispatch);
        const clickVideo  = bindActionCreators(VideoBGActionCreators.clickVideo, dispatch);
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
                    <Divider/>
                    <Grid columns='equal'>
                        <Grid.Column>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <p>It's an undeniable fact, really; authors often misinterpret the shell as a grimy trunk, when in actuality it feels more like an ingrained bakery. This could be, or perhaps authors often misinterpret the motion as a looser hydrant, when in actuality it feels more like a bleary drink. One cannot separate printers from mopy dimples. Before footnotes, badgers were only skies.</p>
                            <p>In recent years, they were lost without the abject profit that composed their cause. Some assert that the chicories could be said to resemble unkept hygienics. Those rugbies are nothing more than bricks. The receipt is a temple.</p>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <p>To be more specific, a signature is the shake of a ghana. Recent controversy aside, the literature would have us believe that a postponed handball is not but a cappelletti. If this was somewhat unclear, before airports, brakes were only grandmothers. It's an undeniable fact, really; a collar is a punch from the right perspective.</p>
                            <p>Some posit the mucking wish to be less than resigned. A push is a trade's frown. In recent years, a battle is the half-brother of a hardboard. Rolls are estrous lynxes.</p>
                        </Grid.Column>
                        <Grid.Column>
                        </Grid.Column>
                    </Grid>
                    <strong className="poc-text">This is placeholder.</strong>
                    <HowItWorksPromo/>
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
        features: state
    }
};

export default connect(mapStateToProps)(FeaturesPage);