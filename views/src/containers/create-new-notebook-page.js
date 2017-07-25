import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as CreateNotebookFormActionCreators from '../actions/create-notebook-form_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import { Container } from 'semantic-ui-react';
import CreateNotebookForm from '../components/create-notebook-form';

class CreateNewNotebookPage extends Component {
    static propTypes = {
        createNewNotebook: PropTypes.object.isRequired
    };
    render() {
        const { dispatch } = this.props;
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const updateUserInfo = bindActionCreators(NavActionCreators.updateUserInfo, dispatch);
        const setLoggedIn = bindActionCreators(NavActionCreators.setLoggedIn, dispatch);
        const signOut = bindActionCreators(NavActionCreators.signOut, dispatch);
        const doCreation = bindActionCreators(CreateNotebookFormActionCreators.doCreation, dispatch);
        const nextStep = bindActionCreators(CreateNotebookFormActionCreators.nextStep, dispatch);
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
                    <Container>
                        <h1>new</h1>
                        <CreateNotebookForm step={0} nextStep={nextStep} doCreation={doCreation} doRedirect={false}/>
                    </Container>
                </Container>
                <Footer clickFooterItem={clickFooterItem}></Footer>
            </div>
        );
    }
}



const mapStateToProps = state => (
    {
        createNewNotebook: state
    }
);

export default connect(mapStateToProps)(CreateNewNotebookPage);