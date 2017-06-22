import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import Nav from '../components/nav';
import ImageUploader from '../components/image-uploader';
import { Container } from 'semantic-ui-react';

class Home extends Component {
    static propTypes = {
        menu: PropTypes.object.isRequired
    };
    render() {
        const { dispatch, menu } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        return (
            <Container>
                <Nav activeItem={menu.activeItem} clickMenuItem={clickMenuItem}></Nav>
                <ImageUploader/>
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