import * as NavActionTypes from '../action_types/nav';

const initialState = {
    activeItem: 'home',
    isLoggedIn: false
};

export default function Nav(state=initialState, action) {
    switch(action.type) {
        case NavActionTypes.NAV_ITEM_CLICKED:
            return Object.assign({}, state, {
                activeItem: action.name
            });
        default:
            return state;
    }
}
