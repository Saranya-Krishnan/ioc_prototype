import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as VideoBGActionCreators from '../actions/videoBG_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import VideoBG from '../components/video-bg';
import BuyCredits from '../components/buy-credits';
import BuyNotebook from '../components/buy-notebook';
import { Container, Segment} from 'semantic-ui-react';


class PurchasePage extends Component {
    static propTypes = {
        purchase: PropTypes.object.isRequired
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
                    <Segment className={'offer-layer'}>
                        <VideoBG
                            clickVideo={clickVideo}
                        />
                    </Segment>
                    <Segment className={'offer-layer'}>
                        <BuyNotebook/>
                    </Segment>
                    <Segment className={'offer-layer'}>
                        <BuyCredits/>
                    </Segment>
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
        purchase: state
    }
};

export default connect(mapStateToProps)(PurchasePage);