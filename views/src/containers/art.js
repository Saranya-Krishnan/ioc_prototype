import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import {Container, Segment } from 'semantic-ui-react';
import EditWork from '../components/editWork';

class Art extends Component {
    static propTypes = {
        art: PropTypes.object.isRequired
    };
    render() {
        const { dispatch } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const clickFooterItem = bindActionCreators(FooterActionCreators.clickFooterItem, dispatch);
        const updateUserInfo = bindActionCreators(NavActionCreators.updateUserInfo, dispatch);
        const setLoggedIn = bindActionCreators(NavActionCreators.setLoggedIn, dispatch);
        return (
            <div>
                <Container className={'main-content'}>
                    <Nav clickMenuItem={clickMenuItem} updateUserInfo={updateUserInfo} setLoggedIn={setLoggedIn}></Nav>
                    <Segment>
                        <h1>Art</h1>
                        <h2>{this.props.match.params.id}</h2>
                    </Segment>
                    <EditWork></EditWork>
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