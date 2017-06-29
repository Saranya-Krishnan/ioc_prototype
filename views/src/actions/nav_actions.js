import * as NavActionTypes from '../action_types/nav';

export const clickMenuItem = name => {
    return {
        type: NavActionTypes.NAV_ITEM_CLICKED,
        name
    };
};

export const updateUserInfo = data => {
    return {
        type: NavActionTypes.UPDATE_USER_INFO, data
    };
};

export const setLoggedIn = status => {
    return {
        type: NavActionTypes.CHECK_LOGGED_IN, status
    };
};
