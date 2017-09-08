import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as NavActionCreators from '../actions/nav_actions';
import * as BasicMapActionCreators from '../actions/basic-map_actions';
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
        const clickMenuItem = bindActionCreators(NavActionCreators.clickMenuItem, dispatch);
        const updateUserInfo = bindActionCreators(NavActionCreators.updateUserInfo, dispatch);
        const setLoggedIn = bindActionCreators(NavActionCreators.setLoggedIn, dispatch);
        const getLocation = bindActionCreators(NavActionCreators.getLocation, dispatch);
        const signOut = bindActionCreators(NavActionCreators.signOut, dispatch);
        const onMapLoad = bindActionCreators(BasicMapActionCreators.onMapLoad, dispatch);
        const onMapClick = bindActionCreators(BasicMapActionCreators.onMapClick, dispatch);
        const getLocationData = bindActionCreators(BasicMapActionCreators.getLocationData, dispatch);
        const clickFooterItem = bindActionCreators(FooterActionCreators.clickFooterItem, dispatch);
        const tempMarkerExample =         [
            {
                position: {
                    lat: 39.190064,
                    lng:-77.241930
                },
                key: "Cider Barrel",
                defaultAnimation: 2
            }
        ];
        const tempTitleExample = "Help";

        return (
            <div>
                <Nav
                    signOut={signOut}
                    clickMenuItem={clickMenuItem}
                    updateUserInfo={updateUserInfo}
                    setLoggedIn={setLoggedIn}
                    getLocation={getLocation}
                >
                </Nav>
                <Container>
                    <BasicMap
                        onMapLoad={onMapLoad}
                        onMapClick={onMapClick}
                        getLocationData={getLocationData}
                        markers={tempMarkerExample}
                        title={tempTitleExample}
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