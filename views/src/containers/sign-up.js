import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import * as SignUpActionCreators from '../actions/sign-up_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import SignUp from '../components/sign-up-form';
import { Container } from 'semantic-ui-react';

class SignUpPage extends Component {
    static propTypes = {
        menu: PropTypes.object.isRequired
    };
    render() {
        const { dispatch, menu } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const clickFooterItem = bindActionCreators(FooterActionCreators.clickFooterItem, dispatch);
        const onClickSubmit = bindActionCreators(SignUpActionCreators.onClickSubmit, dispatch);
        return (
            <div>
                <Container className={'main-content'}>
                    <Nav activeItem={'sign-up'} clickMenuItem={clickMenuItem}></Nav>
                    <SignUp onClickSubmit={onClickSubmit}/>
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

export default connect(mapStateToProps)(SignUpPage);