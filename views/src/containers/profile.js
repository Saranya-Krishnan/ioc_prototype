import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import Nav from '../components/nav';
import {Container, Segment } from 'semantic-ui-react';

class Profile extends Component {
    static propTypes = {
        menu: PropTypes.object.isRequired
    };
    render() {
        const { dispatch, menu } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        return (
            <Container>
                <Nav activeItem={menu.activeItem} clickMenuItem={clickMenuItem}></Nav>
                <Segment>
                    <h1>Profile</h1>
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

export default connect(mapStateToProps)(Profile);