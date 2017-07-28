import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import * as NotebookActionCreators from '../actions/notebook_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import Notebook from '../components/notebook';
import {Container, Segment } from 'semantic-ui-react';

class NotebookPage extends Component {
    static propTypes = {
        notebookPage: PropTypes.object.isRequired
    };
    render() {
        const { dispatch } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const updateUserInfo = bindActionCreators(NavActionCreators.updateUserInfo, dispatch);
        const signOut = bindActionCreators(NavActionCreators.signOut, dispatch);
        const setLoggedIn = bindActionCreators(NavActionCreators.setLoggedIn, dispatch);
        const createNewNotebook = bindActionCreators(NotebookActionCreators.createNewNotebook, dispatch);
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
                    <Segment>
                        <Notebook
                            isNewNotebook={false}
                            createNewNotebook={createNewNotebook}
                            doRedirect={false}
                            id={this.props.match.params.id}/>
                    </Segment>
                </Container>
                <Footer clickFooterItem={clickFooterItem}></Footer>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        notebookPage: state
    }
);

export default connect(mapStateToProps)(NotebookPage);