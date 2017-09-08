import React, { Component } from 'react'
import _ from "lodash";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as BasicMapActions from '../actions/basic-map_actions';
import {toastr} from 'react-redux-toastr';
import { withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import Seed from "../../../ioc.seed";

const BasicGoogleMap = _.flowRight(withScriptjs, withGoogleMap)
    (props => (
        <div>
            <h1>{props.title}</h1>
            <GoogleMap
                ref={props.onMapLoad}
                defaultZoom={props.defaultZoom}
                defaultCenter={props.defaultCenter}
                onClick={props.onMapClick}>
                {props.markers ?
                    props.markers.map(marker => (
                        <Marker
                            {...marker}
                            onRightClick={() => props.onMarkerRightClick(marker)}
                        />
                    )) : null}
            </GoogleMap>
        </div>
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
        if(this.user){
            this.mapStart = this.user['coords'] ? {lat: this.user['coords'].latitude, lng: this.user['coords'].longitude} : Seed.defaultLocation;
        }else{
            this.mapStart =  Seed.defaultLocation;
        }
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
            markers: nextMarkers
        });

        if (nextMarkers.length === 3) {
            toastr.warning(`Right click on the marker to remove it`,`Also check the code!`);
        }
    }

    handleMarkerRightClick(targetMarker) {
        const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
        this.setState({
            markers: nextMarkers
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps.state);
    }

    render() {
        console.log('>>',this.state.markers);
        return (
            <div>
                <h1>{this.props.title}</h1>
            <BasicGoogleMap
                googleMapURL={this.googleUrl}
                onMapLoad={this.handleMapLoad}
                onMapClick={this.handleMapClick}
                markers={this.state.markers}
                onMarkerRightClick={this.handleMarkerRightClick}
                defaultZoom={13}
                defaultCenter={this.mapStart}
                loadingElement={
                    <div style={{ height: `400px` }}>
                        Loading
                    </div>
                }
                containerElement={
                    <div style={{ height: `400px` }} />
                }
                mapElement={
                    <div style={{ height: `400px` }} />
                }
            />
            </div>
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
    markers: PropTypes.any,
    height: PropTypes.number,
    width: PropTypes.number,
    title: PropTypes.string
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