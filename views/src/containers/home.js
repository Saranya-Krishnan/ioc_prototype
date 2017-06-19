import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as NavActionCreators from '../actions/nav_actions';
import Nav from '../components/nav';
import {Container, Segment } from 'semantic-ui-react';

class Home extends Component {

    render() {
        const { dispatch, menu } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        return (
            <Container>
                <Nav activeItem={menu.activeItem } clickMenuItem={clickMenuItem}></Nav>
                <Segment>
                    <h1>Home</h1>
                </Segment>
            </Container>
        );
    }
}

const mapStateToProps = state => (
    {
        menu: state
    }
);

export default connect(mapStateToProps)(Home);