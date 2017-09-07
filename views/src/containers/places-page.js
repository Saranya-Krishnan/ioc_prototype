import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as FooterActionCreators from '../actions/footer_actions';
import Nav from '../components/nav';
import Footer from '../components/footer';
import { Container} from 'semantic-ui-react';
import BasicMap from "../components/basic-map";


class PlacesPage extends Component {
    static propTypes = {
        places: PropTypes.object.isRequired
    };
    render() {
        const { dispatch } = this.props;
        const markers = [{
            position: {
                lat: 43.1628149,
                lng: -88.18509800000001
            },
            key: `Sussex,WI`,
            defaultAnimation: 2
        }
        ];
        const defaultCenter = {
            lat: 43.1628149,
            lng: -88.18509800000001
        };
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const updateUserInfo = bindActionCreators(NavActionCreators.updateUserInfo, dispatch);
        const setLoggedIn = bindActionCreators(NavActionCreators.setLoggedIn, dispatch);
        const signOut = bindActionCreators(NavActionCreators.signOut, dispatch);
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
                    <BasicMap
                        markers={markers}
                        defaultCenter={defaultCenter}
                    />
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
        places: state
    }
};

export default connect(mapStateToProps)(PlacesPage);