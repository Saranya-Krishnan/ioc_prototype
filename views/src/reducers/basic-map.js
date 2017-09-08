import * as BasicMapActionTypes from '../action_types/basic-map';

const initialState = {
    title:'',
    markers:[]
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
