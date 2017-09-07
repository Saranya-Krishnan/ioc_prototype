import * as BasicMapActionTypes from '../action_types/basic-map';

const initialState = {
    markers:[
        {
            position: {
                lat: 43.1628149,
                lng: -88.18509800000001
            },
            key: "Sussex,WI",
            defaultAnimation: 2
        },
        {
            position: {
                lat: 51.50072919999999,
                lng: -0.1246254
            },
            key: "Big Ben",
            defaultAnimation: 2
        }
    ],
    defaultZoom: 3,
    defaultCenter:{
        lat: 25.0112183,
        lng: 121.52067570000001
    }
};

export default function BasicMap(state=initialState, action) {
    switch(action.type) {
        case BasicMapActionTypes.ON_MAP_CLICK:
            return Object.assign({}, state, {
            });
            return state;
        case BasicMapActionTypes.ON_MAP_LOAD:
            return Object.assign({}, state, {
                map: action.map
            });
            return state;
        case BasicMapActionTypes.GET_LOCATION_DATA:
            return Object.assign({}, state, {
                data: action.data
            });
            return state;
        default:
            return state;
    }
}
