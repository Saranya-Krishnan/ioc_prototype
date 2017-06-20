import * as NavActionTypes from '../action_types/nav';

const initialState ={
    activeItem: 'home',
    isLoggedIn: false,
    isRedirect:false
};

export default function Nav(state=initialState, action) {
    switch(action.type) {
        case NavActionTypes.NAV_ITEM_CLICKED:
            state.activeItem = action.name;
           return state;
        default:
            return state;
    }
}
