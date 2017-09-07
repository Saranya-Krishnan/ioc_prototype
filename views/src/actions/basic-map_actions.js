import * as BasicMapActionTypes from '../action_types/basic-map';

export const onMapClick = () => {
    return {
        type: BasicMapActionTypes.ON_MAP_CLICK
    };
};

export const onMapLoad = (map) => {
    return {
        type: BasicMapActionTypes.ON_MAP_LOAD,map
    };
};

export const getLocationData = (data) => {
    return {
        type: BasicMapActionTypes.GET_LOCATION_DATA,
        data
    };
};