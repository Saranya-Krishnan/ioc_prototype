import * as NavActionTypes from '../action_types/nav';

export const clickMenuItem = name => {
    return {
        type: NavActionTypes.NAV_ITEM_CLICKED,
        name
    };
};