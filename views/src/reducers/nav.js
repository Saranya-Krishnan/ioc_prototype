import * as NavActionTypes from '../action_types/nav';


const initialState = {
    activeItem: 'home',
    isLoggedIn: false,
    sessionToken: '',
    userInfo:{
        id:'',
        username:'',
        firstName:'',
        lastName:''
    }
};

export default function Nav(state=initialState, action) {
    switch(action.type) {
        case NavActionTypes.NAV_ITEM_CLICKED:
            return Object.assign({}, state, {
                activeItem: action.name
            });
        case NavActionTypes.UPDATE_USER_INFO:
            return Object.assign({}, state, {
                userInfo: action.data
            });
        case NavActionTypes.CHECK_LOGGED_IN:
            return Object.assign({}, state, {
                isLoggedIn: action.status
            });
        default:
            return state;
    }
}