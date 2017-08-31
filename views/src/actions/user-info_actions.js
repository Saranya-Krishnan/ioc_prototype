import * as UserInfoActionTypes from '../action_types/user-info';

export const uploadAvatar = () => {
    return {
        type: UserInfoActionTypes.UPLOAD_AVATAR
    };
};

export const edit = () => {
    return {
        type: UserInfoActionTypes.EDIT
    };
};

export const toggleMode = () => {
    return {
        type: UserInfoActionTypes.TOGGLE_MODE
    };
};