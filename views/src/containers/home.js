import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import ImageUploader from '../components/image-uploader';
import { Container } from 'semantic-ui-react';

class Home extends Component {
    static propTypes = {
        menu: PropTypes.object.isRequired
    };
    render() {
        const { dispatch, menu } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const clickFooterItem = bindActionCreators(FooterActionCreators.clickFooterItem, dispatch);
        return (
            <div>
                <Container className={'main-content'}>
                    <Nav activeItem={'home'} clickMenuItem={clickMenuItem}></Nav>
                    <ImageUploader/>
                </Container>
                <Footer clickFooterItem={clickFooterItem}></Footer>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        menu: state
    }
);

export default connect(mapStateToProps)(Home);