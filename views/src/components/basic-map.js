import React, { Component } from 'react'
import _ from "lodash";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ajax from 'superagent';
import { Segment } from 'semantic-ui-react';
import * as BasicMapActions from '../actions/basic-map_actions';
import PathHelper from '../helpers/path-helper';
import {toastr} from 'react-redux-toastr';
import { withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";

const BasicGoogleMap = _.flowRight(withScriptjs, withGoogleMap)
    (props => (
                <GoogleMap
                    ref={props.onMapLoad}
                    defaultZoom={props.defaultZoom}
                    defaultCenter={props.defaultCenter}
                    onClick={props.onMapClick}
                >
                    {props.markers ?
                        props.markers.map(marker => (
                            <Marker
                                {...marker}
                                onRightClick={() => props.onMarkerRightClick(marker)}
                            />
                        )) : null}
                </GoogleMap>
        ));

class BasicMap extends Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.googleUrl = process.env.GOOGLE_MAPS_URL + "?v="+process.env.GOOGLE_MAPS_VERSION +"&key=" + process.env.GOOGLE_MAPS_API;
    }

    getLocation(){

    }

    handleMapLoad(map) {
        this.setState(map);
    }

    handleMapClick(event) {
        const nextMarkers = [
            ...this.state.markers,
            {
                position: event.latLng,
                defaultAnimation: 2,
                key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
            },
        ];
        this.setState({
            markers: nextMarkers,
        });

        if (nextMarkers.length === 3) {
            toastr.warning(`Right click on the marker to remove it`,`Also check the code!`);
        }
    }

    handleMarkerRightClick(targetMarker) {
        const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
        this.setState({
            markers: nextMarkers,
        });
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        this.setState(nextProps.state);
    }

    render() {
        return (
            <BasicGoogleMap
                googleMapURL={this.googleUrl}
                onMapLoad={this.handleMapLoad}
                onMapClick={this.handleMapClick}
                markers={this.state.markers}
                onMarkerRightClick={this.handleMarkerRightClick}
                defaultZoom={this.state.defaultZoom}
                defaultCenter={this.state.defaultCenter}
                loadingElement={
                    <div style={{ height: `1000px` }}>
                        Loading
                    </div>
                }
                containerElement={
                    <div style={{ height: `1000px%` }} />
                }
                mapElement={
                    <div style={{ height: `1000px` }} />
                }
            />
        );
    }
}

BasicMap.propTypes = {
    onMapLoad: PropTypes.func,
    getLocationData: PropTypes.func,
    defaultZoom: PropTypes.number,
    defaultCenter: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    }),
    onClick: PropTypes.func,
    markers: PropTypes.arrayOf(PropTypes.shape({
        position: PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number
        }),
        key: PropTypes.string,
        defaultAnimation: PropTypes.number
    }))
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMapClick: () => {
            dispatch(BasicMapActions.onMapClick())
        },
        onMapLoad: (map) => {
            dispatch(BasicMapActions.onMapLoad(map))
        },
        getLocationData: (data) => {
            dispatch(BasicMapActions.getLocationData(data))
        }
    }
};

const mapStateToProps = (state) => {
    return {
        state: state['BasicMap'],
        user: state['Nav']
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicMap);